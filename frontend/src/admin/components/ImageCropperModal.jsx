import { useCallback, useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import './ImageCropperModal.css';

const MAX_BOX = 320;       // longest side of the on-screen crop box (CSS px)
const OUTPUT_LONG = 1400;  // longest side of the saved image
const EDIT_MAX = 2400;     // working copy size — enough detail for the output, far lighter than a 12 MP photo
const MAX_ZOOM = 4;

/**
 * Decode the photo off the main thread and shrink it to a working copy.
 * A phone photo is ~4000×3000; decoding and moving that on the main thread is what made
 * the old editor slow to open and laggy to drag.
 */
async function decodeForEditing(file) {
  let source = null;
  if (typeof createImageBitmap === 'function') {
    try {
      source = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      source = null;
    }
  }
  if (!source) {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      source = img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  const width = source.naturalWidth || source.width;
  const height = source.naturalHeight || source.height;
  const scale = Math.min(1, EDIT_MAX / Math.max(width, height));
  if (scale < 1 && typeof createImageBitmap === 'function') {
    try {
      const resized = await createImageBitmap(source, {
        resizeWidth: Math.round(width * scale),
        resizeHeight: Math.round(height * scale),
        resizeQuality: 'high',
      });
      source.close?.();
      return { image: resized, width: resized.width, height: resized.height };
    } catch { /* fall through with the full-size image */ }
  }
  return { image: source, width, height };
}

export default function ImageCropperModal({ file, aspect = 3 / 4, onCancel, onSave, onSkip }) {
  const boxW = aspect >= 1 ? MAX_BOX : Math.round(MAX_BOX * aspect);
  const boxH = aspect >= 1 ? Math.round(MAX_BOX / aspect) : MAX_BOX;

  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [cropping, setCropping] = useState(false);

  const viewerRef = useRef(null);
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  // Position/zoom live in a ref: dragging updates the DOM directly, with no React re-render per move
  const viewRef = useRef({ x: 0, y: 0, zoom: 1, baseW: 0, baseH: 0 });
  const pointersRef = useRef(new Map());
  const gestureRef = useRef(null);
  const frameRef = useRef(0);

  const paint = useCallback(() => {
    frameRef.current = 0;
    const canvas = canvasRef.current;
    const { x, y, zoom, baseW } = viewRef.current;
    if (!canvas || !baseW) return;
    const scale = (baseW * zoom) / canvas.width;
    canvas.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    const slider = sliderRef.current;
    if (slider && Math.abs(Number(slider.value) - zoom) > 0.001) slider.value = String(zoom);
  }, []);

  const schedulePaint = useCallback(() => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(paint);
  }, [paint]);

  const setView = useCallback((next) => {
    const view = viewRef.current;
    if (!view.baseW) return;
    const zoom = Math.min(MAX_ZOOM, Math.max(1, next.zoom ?? view.zoom));
    view.zoom = zoom;
    view.x = Math.min(0, Math.max(boxW - view.baseW * zoom, next.x ?? view.x));
    view.y = Math.min(0, Math.max(boxH - view.baseH * zoom, next.y ?? view.y));
    schedulePaint();
  }, [boxW, boxH, schedulePaint]);

  // Zoom while keeping the point under the cursor/fingers fixed
  const zoomAt = useCallback((zoom, cx = boxW / 2, cy = boxH / 2) => {
    const view = viewRef.current;
    const nextZoom = Math.min(MAX_ZOOM, Math.max(1, zoom));
    const imageX = (cx - view.x) / view.zoom;
    const imageY = (cy - view.y) / view.zoom;
    setView({ zoom: nextZoom, x: cx - imageX * nextZoom, y: cy - imageY * nextZoom });
  }, [boxW, boxH, setView]);

  const resetView = useCallback(() => {
    const view = viewRef.current;
    setView({ zoom: 1, x: (boxW - view.baseW) / 2, y: (boxH - view.baseH) / 2 });
  }, [boxW, boxH, setView]);

  // Decode + prepare the working copy
  useEffect(() => {
    let cancelled = false;
    let decoded = null;

    decodeForEditing(file)
      .then((result) => {
        decoded = result;
        if (cancelled) return;
        const canvas = canvasRef.current;
        canvas.width = result.width;
        canvas.height = result.height;
        canvas.getContext('2d').drawImage(result.image, 0, 0, result.width, result.height);
        result.image.close?.(); // the canvas now holds the pixels

        const cover = Math.max(boxW / result.width, boxH / result.height);
        const view = viewRef.current;
        view.baseW = result.width * cover;
        view.baseH = result.height * cover;
        view.zoom = 1;
        view.x = (boxW - view.baseW) / 2;
        view.y = (boxH - view.baseH) / 2;
        paint();
        setStatus('ready');
      })
      .catch(() => { if (!cancelled) setStatus('error'); });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      decoded?.image?.close?.();
    };
  }, [file, boxW, boxH, paint]);

  // ── Pointer gestures: drag with mouse/finger, pinch with two fingers ──
  const beginGesture = () => {
    const points = [...pointersRef.current.values()];
    const view = viewRef.current;
    if (points.length === 1) {
      gestureRef.current = { type: 'pan', px: points[0].x, py: points[0].y, x: view.x, y: view.y };
    } else if (points.length >= 2) {
      const [a, b] = points;
      gestureRef.current = { type: 'pinch', distance: Math.hypot(a.x - b.x, a.y - b.y) || 1, zoom: view.zoom };
    } else {
      gestureRef.current = null;
    }
  };

  const handlePointerDown = (e) => {
    if (status !== 'ready') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    beginGesture();
  };

  const handlePointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const gesture = gestureRef.current;
    if (!gesture) return;
    const points = [...pointersRef.current.values()];
    if (gesture.type === 'pan' && points.length === 1) {
      setView({ x: gesture.x + (points[0].x - gesture.px), y: gesture.y + (points[0].y - gesture.py) });
    } else if (gesture.type === 'pinch' && points.length >= 2) {
      const [a, b] = points;
      const rect = viewerRef.current.getBoundingClientRect();
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt(gesture.zoom * (distance / gesture.distance), (a.x + b.x) / 2 - rect.left, (a.y + b.y) / 2 - rect.top);
    }
  };

  const handlePointerEnd = (e) => {
    pointersRef.current.delete(e.pointerId);
    beginGesture();
  };

  // Mouse wheel / trackpad zoom (needs a non-passive listener to prevent page scroll)
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = viewer.getBoundingClientRect();
      zoomAt(viewRef.current.zoom * Math.exp(-e.deltaY * 0.0015), e.clientX - rect.left, e.clientY - rect.top);
    };
    viewer.addEventListener('wheel', onWheel, { passive: false });
    return () => viewer.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  const handleCrop = useCallback(async () => {
    const canvas = canvasRef.current;
    const view = viewRef.current;
    if (status !== 'ready' || cropping || !canvas) return;
    setCropping(true);
    try {
      // Crop rectangle in working-copy pixels
      const scale = canvas.width / (view.baseW * view.zoom);
      const sx = -view.x * scale;
      const sy = -view.y * scale;
      const sw = boxW * scale;
      const sh = boxH * scale;

      // Never upscale beyond the source detail
      const longSide = Math.max(1, Math.min(OUTPUT_LONG, Math.round(Math.max(sw, sh))));
      const outW = aspect >= 1 ? longSide : Math.round(longSide * aspect);
      const outH = aspect >= 1 ? Math.round(longSide / aspect) : longSide;

      const output = document.createElement('canvas');
      output.width = outW;
      output.height = outH;
      const ctx = output.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, outW, outH);
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(canvas, sx, sy, sw, sh, 0, 0, outW, outH);

      let blob = await new Promise((resolve) => output.toBlob(resolve, 'image/webp', 0.88));
      if (!blob || blob.type !== 'image/webp') {
        blob = await new Promise((resolve) => output.toBlob(resolve, 'image/jpeg', 0.9));
      }
      if (!blob) throw new Error('Could not create the cropped image');

      const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
      const baseName = (file.name || 'cropped').replace(/\.[^.]+$/, '');
      onSave(new File([blob], `${baseName}.${ext}`, { type: blob.type, lastModified: Date.now() }));
    } catch {
      setCropping(false);
      setStatus('error');
    }
  }, [status, cropping, boxW, boxH, aspect, file, onSave]);

  // Keyboard: Esc cancel · Enter crop · arrows move · +/- zoom
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onCancel(); return; }
      if (status !== 'ready') return;
      const view = viewRef.current;
      const step = e.shiftKey ? 40 : 10;
      const actions = {
        Enter: () => handleCrop(),
        ArrowLeft: () => setView({ x: view.x + step }),
        ArrowRight: () => setView({ x: view.x - step }),
        ArrowUp: () => setView({ y: view.y + step }),
        ArrowDown: () => setView({ y: view.y - step }),
        '+': () => zoomAt(view.zoom * 1.15),
        '=': () => zoomAt(view.zoom * 1.15),
        '-': () => zoomAt(view.zoom / 1.15),
      };
      if (actions[e.key]) {
        e.preventDefault();
        actions[e.key]();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status, onCancel, handleCrop, setView, zoomAt]);

  const ready = status === 'ready';

  return (
    <div className="cropper-modal-overlay" role="dialog" aria-modal="true" aria-label="Crop image">
      <div className="cropper-modal">
        <div className="cropper-modal__header">
          <h3>Crop Image</h3>
          <p>Drag to move · scroll, pinch or use the slider to zoom</p>
        </div>

        <div className="cropper-modal__body">
          <div
            ref={viewerRef}
            className={`cropper-modal__viewer ${ready ? 'is-ready' : ''}`}
            style={{ width: boxW, height: boxH }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          >
            <canvas ref={canvasRef} className="cropper-modal__canvas" />

            {status === 'loading' && (
              <div className="cropper-modal__loader">
                <span className="cropper-modal__spinner" />
                Preparing image…
              </div>
            )}
            {status === 'error' && (
              <div className="cropper-modal__loader cropper-modal__loader--error">
                This image can't be cropped here.{onSkip ? ' You can use it without cropping.' : ''}
              </div>
            )}

            {/* Rule-of-thirds guides */}
            <div className="cropper-modal__grid-line cropper-modal__grid-h1" />
            <div className="cropper-modal__grid-line cropper-modal__grid-h2" />
            <div className="cropper-modal__grid-line cropper-modal__grid-v1" />
            <div className="cropper-modal__grid-line cropper-modal__grid-v2" />
          </div>

          <div className="cropper-modal__controls">
            <button type="button" className="cropper-modal__icon-btn" onClick={() => zoomAt(viewRef.current.zoom / 1.25)} disabled={!ready} aria-label="Zoom out">
              <ZoomOut size={18} />
            </button>
            <input
              ref={sliderRef}
              type="range"
              min="1"
              max={MAX_ZOOM}
              step="0.01"
              defaultValue="1"
              onInput={(e) => zoomAt(parseFloat(e.currentTarget.value))}
              className="cropper-modal__zoom-slider"
              disabled={!ready}
              aria-label="Zoom"
            />
            <button type="button" className="cropper-modal__icon-btn" onClick={() => zoomAt(viewRef.current.zoom * 1.25)} disabled={!ready} aria-label="Zoom in">
              <ZoomIn size={18} />
            </button>
            <button type="button" className="cropper-modal__icon-btn" onClick={resetView} disabled={!ready} aria-label="Reset position" title="Reset">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        <div className="cropper-modal__footer">
          <button type="button" className="btn-admin btn-admin--outline" onClick={onCancel} disabled={cropping}>
            Cancel
          </button>
          {onSkip && (
            <button type="button" className="btn-admin btn-admin--outline" onClick={onSkip} disabled={cropping}>
              Use without cropping
            </button>
          )}
          <button type="button" className="btn-admin btn-admin--primary" onClick={handleCrop} disabled={!ready || cropping}>
            {cropping ? 'Cropping…' : 'Crop & Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo, useRef } from 'react';
import './ImageCropperModal.css';

const MAX_BOX = 320;       // longest side of the on-screen crop box
const OUTPUT_LONG = 1400;  // longest side of the saved image

export default function ImageCropperModal({ file, aspect = 3 / 4, onCancel, onSave, onSkip }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  const [loading, setLoading] = useState(true);

  const imgRef = useRef(null);
  const cropBoxWidth = aspect >= 1 ? MAX_BOX : Math.round(MAX_BOX * aspect);
  const cropBoxHeight = aspect >= 1 ? Math.round(MAX_BOX / aspect) : MAX_BOX;

  // Object URLs are instant even for large photos (a data URL has to base64-encode the whole file)
  const imageSrc = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  useEffect(() => () => { if (imageSrc) URL.revokeObjectURL(imageSrc); }, [imageSrc]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const handleImageLoad = (e) => {
    const img = e.target;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    // Calculate initial size to cover the crop box (aspect fill)
    const scaleToCover = Math.max(cropBoxWidth / naturalWidth, cropBoxHeight / naturalHeight);
    const baseWidth = naturalWidth * scaleToCover;
    const baseHeight = naturalHeight * scaleToCover;

    setImageSize({ width: baseWidth, height: baseHeight, naturalWidth, naturalHeight });
    // Center the image initially relative to the crop box
    setOffset({ x: (cropBoxWidth - baseWidth) / 2, y: (cropBoxHeight - baseHeight) / 2 });
    setZoom(1);
    setLoading(false);
  };

  const clampOffset = (x, y, currentZoom) => ({
    x: Math.max(cropBoxWidth - imageSize.width * currentZoom, Math.min(0, x)),
    y: Math.max(cropBoxHeight - imageSize.height * currentZoom, Math.min(0, y)),
  });

  // Dragging logic (mouse & touch support)
  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    setOffset(clampOffset(clientX - dragStart.x, clientY - dragStart.y, zoom));
  };

  const endDrag = () => setIsDragging(false);

  // Keep offset constrained when zoom changes (done in the handler, not an effect, to avoid an extra render)
  const handleZoom = (nextZoom) => {
    setZoom(nextZoom);
    if (imageSize.width === 0) return;
    setOffset((prev) => clampOffset(prev.x, prev.y, nextZoom));
  };

  const handleCrop = () => {
    if (!imgRef.current) return;

    const outputWidth = aspect >= 1 ? OUTPUT_LONG : Math.round(OUTPUT_LONG * aspect);
    const outputHeight = aspect >= 1 ? Math.round(OUTPUT_LONG / aspect) : OUTPUT_LONG;
    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');

    // Crop parameters relative to the original natural dimensions
    const scale = imageSize.naturalWidth / (imageSize.width * zoom);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outputWidth, outputHeight);
    ctx.drawImage(
      imgRef.current,
      -offset.x * scale, -offset.y * scale, cropBoxWidth * scale, cropBoxHeight * scale,
      0, 0, outputWidth, outputHeight,
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const baseName = (file.name || 'cropped').replace(/\.[^.]+$/, '');
      onSave(new File([blob], `${baseName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() }));
    }, 'image/jpeg', 0.9);
  };

  return (
    <div className="cropper-modal-overlay">
      <div className="cropper-modal">
        <div className="cropper-modal__header">
          <h3>Crop Image</h3>
          <p>Drag the image to position it and use the slider to zoom.</p>
        </div>

        <div className="cropper-modal__body">
          {loading && <div className="cropper-modal__loader">Loading image editor...</div>}

          <div
            className="cropper-modal__viewer"
            style={{ width: cropBoxWidth, height: cropBoxHeight }}
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              startDrag(touch.clientX, touch.clientY);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              moveDrag(touch.clientX, touch.clientY);
            }}
            onTouchEnd={endDrag}
          >
            {imageSrc && (
              <img
                ref={imgRef}
                src={imageSrc}
                alt="To Crop"
                onLoad={handleImageLoad}
                draggable={false}
                style={{
                  position: 'absolute',
                  left: offset.x,
                  top: offset.y,
                  width: imageSize.width * zoom,
                  height: imageSize.height * zoom,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  maxWidth: 'none',
                  maxHeight: 'none',
                }}
              />
            )}

            {/* Grid helper lines for composition */}
            <div className="cropper-modal__grid-line cropper-modal__grid-h1"></div>
            <div className="cropper-modal__grid-line cropper-modal__grid-h2"></div>
            <div className="cropper-modal__grid-line cropper-modal__grid-v1"></div>
            <div className="cropper-modal__grid-line cropper-modal__grid-v2"></div>
          </div>

          <div className="cropper-modal__controls">
            <span className="material-symbols-outlined">zoom_out</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(e) => handleZoom(parseFloat(e.target.value))}
              className="cropper-modal__zoom-slider"
            />
            <span className="material-symbols-outlined">zoom_in</span>
          </div>
        </div>

        <div className="cropper-modal__footer">
          <button type="button" className="btn-admin btn-admin--outline" onClick={onCancel}>
            Cancel
          </button>
          {onSkip && (
            <button type="button" className="btn-admin btn-admin--outline" onClick={onSkip} disabled={loading}>
              Use without cropping
            </button>
          )}
          <button type="button" className="btn-admin btn-admin--primary" onClick={handleCrop} disabled={loading}>
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
}

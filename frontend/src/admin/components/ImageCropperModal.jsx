import { useState, useEffect, useRef } from 'react';
import './ImageCropperModal.css';

export default function ImageCropperModal({ file, onCancel, onSave }) {
  const [imageSrc, setImageSrc] = useState('');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  const [loading, setLoading] = useState(true);

  const imgRef = useRef(null);
  const cropBoxWidth = 240; // 3:4 Aspect Ratio Width
  const cropBoxHeight = 320; // 3:4 Aspect Ratio Height

  // Read file as DataURL
  useEffect(() => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleImageLoad = (e) => {
    const img = e.target;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    // Calculate initial size to cover the crop box (aspect fill)
    const scaleToCover = Math.max(cropBoxWidth / naturalWidth, cropBoxHeight / naturalHeight);
    const baseWidth = naturalWidth * scaleToCover;
    const baseHeight = naturalHeight * scaleToCover;

    // Center the image initially relative to the crop box
    const initialX = (cropBoxWidth - baseWidth) / 2;
    const initialY = (cropBoxHeight - baseHeight) / 2;

    setImageSize({
      width: baseWidth,
      height: baseHeight,
      naturalWidth,
      naturalHeight
    });
    setOffset({ x: initialX, y: initialY });
    setZoom(1);
    setLoading(false);
  };

  // Dragging logic (mouse & touch support)
  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;

    // Calculate tentative new offset
    let newX = clientX - dragStart.x;
    let newY = clientY - dragStart.y;

    // Constrain offset so image always covers crop box
    const currentWidth = imageSize.width * zoom;
    const currentHeight = imageSize.height * zoom;

    const minX = cropBoxWidth - currentWidth;
    const minY = cropBoxHeight - currentHeight;

    newX = Math.max(minX, Math.min(0, newX));
    newY = Math.max(minY, Math.min(0, newY));

    setOffset({ x: newX, y: newY });
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Keep offset constrained when zoom changes
  useEffect(() => {
    if (imageSize.width === 0) return;

    const currentWidth = imageSize.width * zoom;
    const currentHeight = imageSize.height * zoom;

    const minX = cropBoxWidth - currentWidth;
    const minY = cropBoxHeight - currentHeight;

    setOffset((prev) => {
      const newX = Math.max(minX, Math.min(0, prev.x));
      const newY = Math.max(minY, Math.min(0, prev.y));
      return { x: newX, y: newY };
    });
  }, [zoom, imageSize]);

  // Crop & save handler
  const handleCrop = () => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = 600; // Output high-quality resolution (600x800px)
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Calculate crop parameters relative to the original natural dimensions
    const currentWidth = imageSize.width * zoom;
    const currentHeight = imageSize.height * zoom;

    const scale = imageSize.naturalWidth / currentWidth;

    const sx = -offset.x * scale;
    const sy = -offset.y * scale;
    const sw = cropBoxWidth * scale;
    const sh = cropBoxHeight * scale;

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedFile = new File([blob], file.name || 'cropped.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
      onSave(croppedFile);
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="cropper-modal-overlay">
      <div className="cropper-modal">
        <div className="cropper-modal__header">
          <h3>Crop Main Profile Image</h3>
          <p>Drag the image to position and use the slider to zoom.</p>
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
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="cropper-modal__zoom-slider"
            />
            <span className="material-symbols-outlined">zoom_in</span>
          </div>
        </div>

        <div className="cropper-modal__footer">
          <button type="button" className="btn-admin btn-admin--outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-admin btn-admin--primary" onClick={handleCrop} disabled={loading}>
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
}

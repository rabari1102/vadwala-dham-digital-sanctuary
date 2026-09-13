import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import ImageCropperModal from './ImageCropperModal';
import { getImageUrl } from '../../utils/helpers';
import { useToast } from '../context/ToastContext';
import { uploadImage, validateFile, ACCEPTED_TYPES } from '../utils/imageUpload';
import './upload.css';

const NOT_CROPPABLE = new Set(['image/gif', 'image/svg+xml']);

/**
 * Single image input: click or drag & drop, optional crop, compression, progress bar,
 * preview, remove, or paste a URL. Calls onBusyChange(true/false) around uploads so the
 * parent form can block saving until the upload has finished.
 */
export default function ImageField({ value, onChange, crop, onBusyChange }) {
  const { addToast } = useToast();
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [brokenSrc, setBrokenSrc] = useState(null);

  const busy = progress !== null;
  const broken = Boolean(value) && brokenSrc === value;

  const startUpload = async (file, { compress = true } = {}) => {
    setProgress(0);
    onBusyChange?.(true);
    try {
      const url = await uploadImage(file, { onProgress: setProgress, compress });
      onChange(url);
      addToast('Image uploaded', 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setProgress(null);
      onBusyChange?.(false);
    }
  };

  const handleFiles = (files) => {
    const file = files?.[0];
    if (!file || busy) return;
    const error = validateFile(file);
    if (error) {
      addToast(error, 'error');
      return;
    }
    if (crop && !NOT_CROPPABLE.has(file.type)) setCropFile(file);
    else startUpload(file);
  };

  const openPicker = () => {
    if (!busy) inputRef.current?.click();
  };

  const label = progress === 0 ? 'Preparing…' : progress >= 1 ? 'Saving…' : `Uploading ${Math.round(progress * 100)}%`;

  return (
    <div className="image-field">
      <div
        className={`image-field__drop ${dragOver ? 'is-dragover' : ''} ${busy ? 'is-busy' : ''}`}
        onClick={openPicker}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker(); } }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        role="button"
        tabIndex={0}
        aria-label={value ? 'Replace image' : 'Upload image'}
      >
        {value && !broken ? (
          <>
            <img src={getImageUrl(value, 480)} alt="" className="image-field__preview" onError={() => setBrokenSrc(value)} />
            {!busy && <span className="image-field__hint">Click or drop to replace</span>}
          </>
        ) : (
          <div className="image-field__placeholder">
            <Upload size={26} />
            <strong>{broken ? 'Image could not be loaded — upload a new one' : 'Click or drag an image here'}</strong>
            <small>JPG, PNG, WebP, GIF · large photos are compressed automatically{crop ? ' · you can crop before upload' : ''}</small>
          </div>
        )}
        {busy && (
          <div className="image-field__progress">
            <span className="spinner" />
            <span>{label}</span>
            <div className="progress-bar"><div style={{ width: `${Math.round(progress * 100)}%` }} /></div>
          </div>
        )}
      </div>

      <div className="image-field__row">
        <input
          type="text"
          className="admin-form__input"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
          disabled={busy}
        />
        {value && (
          <button type="button" className="btn-admin btn-admin--outline btn-admin--sm" onClick={() => onChange('')} disabled={busy}>
            <X size={14} /> Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = ''; // allow picking the same file again
        }}
      />

      {cropFile && (
        <ImageCropperModal
          file={cropFile}
          aspect={crop.aspect}
          onCancel={() => setCropFile(null)}
          onSkip={() => {
            const original = cropFile;
            setCropFile(null);
            startUpload(original);
          }}
          onSave={(croppedFile) => {
            setCropFile(null);
            startUpload(croppedFile, { compress: false });
          }}
        />
      )}
    </div>
  );
}

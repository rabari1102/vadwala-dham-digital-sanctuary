import { useEffect, useMemo, useRef, useState } from 'react';
import { ImagePlus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../utils/helpers';
import { useToast } from '../context/ToastContext';
import { uploadImages, validateFile, ACCEPTED_TYPES } from '../utils/imageUpload';
import './upload.css';

const splitUrls = (value) => String(value || '').split('\n').map((s) => s.trim()).filter(Boolean);
const joinUrls = (list) => list.join('\n');
let pendingCounter = 0;

/**
 * Multiple images stored as a newline-separated list of URLs (e.g. guru gallery).
 * Shows thumbnails with reorder/remove, uploads many files in parallel with per-file
 * progress, and keeps failed files visible with their error message.
 */
export default function MultiImageField({ value, onChange, onBusyChange }) {
  const { addToast } = useToast();
  const urls = useMemo(() => splitUrls(value), [value]);
  const [pending, setPending] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  // Uploads finish asynchronously; append to the latest list, not the one from when they started
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  });

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= urls.length) return;
    const next = [...urls];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(joinUrls(next));
  };

  const removeAt = (index) => onChange(joinUrls(urls.filter((_, i) => i !== index)));

  const dismissPending = (id) => {
    setPending((list) => {
      const item = list.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return list.filter((p) => p.id !== id);
    });
  };

  const addFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    const valid = [];
    files.forEach((file) => {
      const error = validateFile(file);
      if (error) addToast(error, 'error');
      else valid.push(file);
    });
    if (valid.length === 0) return;

    const batch = valid.map((file) => {
      pendingCounter += 1;
      return { id: pendingCounter, name: file.name, preview: URL.createObjectURL(file), progress: 0, error: null };
    });
    const patch = (id, changes) => setPending((list) => list.map((p) => (p.id === id ? { ...p, ...changes } : p)));

    setPending((list) => [...list, ...batch]);
    onBusyChange?.(true);

    const results = await uploadImages(valid, {
      onItemProgress: (index, progress) => patch(batch[index].id, { progress }),
      onItemDone: (index, result) => { if (result.error) patch(batch[index].id, { error: result.error }); },
    });

    const uploaded = results.map((r) => r.url).filter(Boolean);
    if (uploaded.length) onChange(joinUrls([...splitUrls(valueRef.current), ...uploaded]));

    const succeededIds = new Set(batch.filter((_, i) => results[i].url).map((p) => p.id));
    batch.forEach((p) => { if (succeededIds.has(p.id)) URL.revokeObjectURL(p.preview); });
    setPending((list) => list.filter((p) => !succeededIds.has(p.id)));

    const failed = results.length - uploaded.length;
    if (failed) addToast(`${uploaded.length} uploaded, ${failed} failed — see the red tiles`, 'error');
    else addToast(`${uploaded.length} image${uploaded.length === 1 ? '' : 's'} uploaded`, 'success');
    onBusyChange?.(false);
  };

  return (
    <div className="multi-image">
      <div
        className={`thumb-grid ${dragOver ? 'is-dragover' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
      >
        {urls.map((url, index) => (
          <div key={`${url}-${index}`} className="thumb">
            <img src={getImageUrl(url, 240)} alt="" loading="lazy" />
            <span className="thumb__index">{index + 1}</span>
            <button type="button" className="thumb__remove" onClick={() => removeAt(index)} aria-label="Remove image">
              <X size={12} />
            </button>
            <div className="thumb__moves">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move left"><ChevronLeft size={14} /></button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === urls.length - 1} aria-label="Move right"><ChevronRight size={14} /></button>
            </div>
          </div>
        ))}

        {pending.map((item) => (
          <div key={item.id} className={`thumb ${item.error ? 'thumb--error' : 'thumb--uploading'}`} title={item.error || item.name}>
            <img src={item.preview} alt="" />
            {item.error ? (
              <>
                <div className="thumb__error">{item.error}</div>
                <button type="button" className="thumb__remove" onClick={() => dismissPending(item.id)} aria-label="Dismiss">
                  <X size={12} />
                </button>
              </>
            ) : (
              <div className="thumb__overlay">
                <span className="spinner" />
                <div className="progress-bar"><div style={{ width: `${Math.round(item.progress * 100)}%` }} /></div>
              </div>
            )}
          </div>
        ))}

        <button type="button" className="thumb thumb--add" onClick={() => inputRef.current?.click()}>
          <ImagePlus size={22} />
          <span>Add photos</span>
          <small>select many or drop here</small>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple
        hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = '';
        }}
      />

      <details className="multi-image__text">
        <summary>Edit as text (one image URL per line)</summary>
        <textarea className="admin-form__input admin-form__textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      </details>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Upload, X, Check, RotateCw } from 'lucide-react';
import adminApi, { getErrorMessage } from '../hooks/adminApi';
import { useToast } from '../context/ToastContext';
import { uploadImages, validateFile, ACCEPTED_TYPES } from '../utils/imageUpload';
import './upload.css';

const MAX_FILES = 200;
let itemCounter = 0;

const fileSignature = (file) => `${file.name}:${file.size}:${file.lastModified}`;

/**
 * Bulk photo import: pick/drag many photos, choose a category, and every photo is
 * compressed, uploaded (3 at a time) and saved as a gallery item in one request.
 * Failed photos stay in the list with their error and can be retried; photos that
 * uploaded but failed to save are not uploaded twice.
 */
export default function BulkUploadModal({ endpoint, categoryField = 'categoryId', categoryEndpoint, onClose, onDone }) {
  const { addToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('published');
  const [titlePrefix, setTitlePrefix] = useState('');
  const [items, setItems] = useState([]);
  const [running, setRunning] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  });

  useEffect(() => {
    let cancelled = false;
    adminApi.getAll(categoryEndpoint)
      .then((res) => { if (!cancelled) setCategories(Array.isArray(res.data) ? res.data : []); })
      .catch((err) => { if (!cancelled) addToast(getErrorMessage(err, 'Could not load categories'), 'error'); });
    return () => { cancelled = true; };
  }, [categoryEndpoint, addToast]);

  // Free preview memory when the modal closes
  useEffect(() => () => itemsRef.current.forEach((item) => URL.revokeObjectURL(item.preview)), []);

  // Warn before leaving the page mid-upload
  useEffect(() => {
    if (!running) return;
    const onBeforeUnload = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [running]);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (incoming.length === 0) return;

    const current = itemsRef.current;
    const seen = new Set(current.map((item) => fileSignature(item.file)));
    const errors = [];
    const additions = [];

    for (const file of incoming) {
      const error = validateFile(file);
      if (error) { errors.push(error); continue; }
      const signature = fileSignature(file);
      if (seen.has(signature)) continue;
      if (current.length + additions.length >= MAX_FILES) {
        errors.push(`Only ${MAX_FILES} photos can be added in one batch.`);
        break;
      }
      seen.add(signature);
      itemCounter += 1;
      additions.push({ id: itemCounter, file, preview: URL.createObjectURL(file), state: 'queued', progress: 0, error: null, url: null });
    }

    if (additions.length) setItems((list) => [...list, ...additions]);
    if (errors.length) addToast(errors.length === 1 ? errors[0] : `${errors.length} files skipped: ${errors[0]}`, 'error');
  };

  const removeItem = (id) => {
    setItems((list) => {
      const item = list.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return list.filter((i) => i.id !== id);
    });
  };

  const clearWhere = (predicate) => {
    setItems((list) => {
      list.filter(predicate).forEach((i) => URL.revokeObjectURL(i.preview));
      return list.filter((i) => !predicate(i));
    });
  };

  const start = async () => {
    if (!categoryId) {
      addToast('Please choose a category first', 'error');
      return;
    }
    const queue = items.filter((i) => i.state !== 'done');
    if (queue.length === 0) return;

    setRunning(true);
    const patch = (id, changes) => setItems((list) => list.map((i) => (i.id === id ? { ...i, ...changes } : i)));
    const urls = new Map(queue.filter((i) => i.url).map((i) => [i.id, i.url]));
    const toUpload = queue.filter((i) => !i.url);

    toUpload.forEach((i) => patch(i.id, { state: 'uploading', progress: 0, error: null }));
    await uploadImages(toUpload.map((i) => i.file), {
      concurrency: 3,
      onItemProgress: (index, progress) => patch(toUpload[index].id, { progress }),
      onItemDone: (index, result) => {
        const id = toUpload[index].id;
        if (result.url) {
          urls.set(id, result.url);
          patch(id, { state: 'saving', progress: 1, url: result.url });
        } else {
          patch(id, { state: 'error', error: result.error });
        }
      },
    });

    const ready = queue.filter((i) => urls.has(i.id));
    if (ready.length) {
      ready.forEach((i) => patch(i.id, { state: 'saving', error: null }));

      // Continue numbering/order after the photos already in this category
      let lastOrder = 0;
      try {
        const res = await adminApi.getAll(endpoint, { [categoryField]: categoryId });
        lastOrder = (Array.isArray(res.data) ? res.data : []).reduce((max, doc) => Math.max(max, Number(doc.order) || 0), 0);
      } catch { /* start numbering at 1 */ }

      const category = categories.find((c) => c._id === categoryId);
      const prefix = titlePrefix.trim() || category?.title || 'Photo';
      const docs = ready.map((item, index) => ({
        [categoryField]: categoryId,
        image: urls.get(item.id),
        title: `${prefix} ${lastOrder + index + 1}`,
        order: lastOrder + index + 1,
        status,
      }));

      try {
        const res = await adminApi.bulkCreate(endpoint, docs);
        ready.forEach((i) => patch(i.id, { state: 'done' }));
        addToast(`${res.data?.created ?? ready.length} photo(s) added to ${category?.title || 'the gallery'}`, 'success');
        onDone?.();
      } catch (err) {
        const message = getErrorMessage(err, 'Saving to the gallery failed');
        ready.forEach((i) => patch(i.id, { state: 'error', error: `Uploaded but not saved: ${message}` }));
        addToast(message, 'error');
      }
    }

    const failedUploads = toUpload.filter((i) => !urls.has(i.id)).length;
    if (failedUploads) addToast(`${failedUploads} photo(s) failed to upload — click "Retry failed"`, 'error');
    setRunning(false);
  };

  const counts = items.reduce((acc, item) => {
    acc[item.state] = (acc[item.state] || 0) + 1;
    return acc;
  }, {});
  const active = (counts.uploading || 0) + (counts.saving || 0);
  const pendingCount = items.length - (counts.done || 0);
  const onlyFailedLeft = pendingCount > 0 && pendingCount === (counts.error || 0);

  return (
    <div className="admin-modal-overlay" onClick={() => { if (!running) onClose(); }}>
      <div className="admin-modal admin-modal--form bulk-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Bulk upload photos">
        <div className="admin-modal__header">
          <div>
            <h3>Bulk upload photos</h3>
            <p>Select many photos at once. They are compressed, uploaded 3 at a time and added to the chosen category.</p>
          </div>
          <button type="button" className="admin-modal__close" onClick={onClose} disabled={running} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="bulk-modal__body">
          <div className="admin-form__grid">
            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="bulk-category">Category *</label>
              <select id="bulk-category" className="admin-form__input admin-form__select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} disabled={running}>
                <option value="">{categories.length ? '-- Select category --' : 'Loading categories…'}</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
              </select>
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="bulk-status">Status</label>
              <select id="bulk-status" className="admin-form__input admin-form__select" value={status} onChange={(e) => setStatus(e.target.value)} disabled={running}>
                <option value="published">Published (visible on website)</option>
                <option value="draft">Draft (hidden)</option>
              </select>
            </div>
            <div className="admin-form__group admin-form__group--full">
              <label className="admin-form__label" htmlFor="bulk-prefix">Title prefix (optional)</label>
              <input id="bulk-prefix" className="admin-form__input" value={titlePrefix} onChange={(e) => setTitlePrefix(e.target.value)} disabled={running} placeholder="Defaults to the category name, e.g. “દીપાવલી મહોત્સવ 24”" />
            </div>
          </div>

          <div
            className={`dropzone ${dragOver ? 'is-dragover' : ''} ${running ? 'is-disabled' : ''}`}
            onClick={() => { if (!running) inputRef.current?.click(); }}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !running) { e.preventDefault(); inputRef.current?.click(); } }}
            onDragOver={(e) => { e.preventDefault(); if (!running) setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); if (!running) addFiles(e.dataTransfer.files); }}
            role="button"
            tabIndex={0}
          >
            <Upload size={28} />
            <strong>Click to choose photos or drag them here</strong>
            <span>Select many files at once (Ctrl / Shift + click, or Ctrl + A in the folder). JPG, PNG, WebP, GIF · up to {MAX_FILES} per batch</span>
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

          {items.length > 0 && (
            <>
              <div className="bulk-summary">
                <span>{items.length} selected</span>
                {counts.done > 0 && <span className="bulk-summary__ok">{counts.done} added</span>}
                {counts.error > 0 && <span className="bulk-summary__bad">{counts.error} failed</span>}
                {active > 0 && <span>{active} in progress</span>}
                <div className="bulk-summary__actions">
                  {counts.done > 0 && !running && (
                    <button type="button" className="btn-admin btn-admin--outline btn-admin--sm" onClick={() => clearWhere((i) => i.state === 'done')}>Clear added</button>
                  )}
                  {!running && (
                    <button type="button" className="btn-admin btn-admin--outline btn-admin--sm" onClick={() => clearWhere(() => true)}>Remove all</button>
                  )}
                </div>
              </div>

              <div className="thumb-grid">
                {items.map((item) => (
                  <div key={item.id} className={`thumb thumb--${item.state}`} title={item.error || item.file.name}>
                    <img src={item.preview} alt="" loading="lazy" />
                    {(item.state === 'uploading' || item.state === 'saving') && (
                      <div className="thumb__overlay">
                        <span className="spinner" />
                        <div className="progress-bar"><div style={{ width: `${Math.round(item.progress * 100)}%` }} /></div>
                      </div>
                    )}
                    {item.state === 'done' && <span className="thumb__badge"><Check size={14} /></span>}
                    {item.state === 'error' && <div className="thumb__error">{item.error}</div>}
                    {!running && item.state !== 'done' && (
                      <button type="button" className="thumb__remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.file.name}`}>
                        <X size={12} />
                      </button>
                    )}
                    <span className="thumb__name">{item.file.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="admin-form__actions bulk-modal__footer">
          <button type="button" className="btn-admin btn-admin--primary" onClick={start} disabled={running || pendingCount === 0 || !categoryId}>
            {running
              ? 'Uploading…'
              : onlyFailedLeft
                ? <><RotateCw size={14} /> Retry failed ({counts.error})</>
                : items.length > 0 && pendingCount === 0
                  ? <><Check size={14} /> All photos added</>
                  : `Upload ${pendingCount} photo${pendingCount === 1 ? '' : 's'}`}
          </button>
          <button type="button" className="btn-admin btn-admin--outline" onClick={onClose} disabled={running}>
            {counts.done ? 'Done' : 'Cancel'}
          </button>
          {!categoryId && items.length > 0 && <span className="bulk-modal__note">Choose a category to start</span>}
        </div>
      </div>
    </div>
  );
}

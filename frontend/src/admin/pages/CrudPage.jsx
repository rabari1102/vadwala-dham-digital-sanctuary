import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Edit2, Trash2, X, ToggleLeft, ToggleRight, Upload, RotateCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import adminApi, { getErrorMessage } from '../hooks/adminApi';
import ImageField from '../components/ImageField';
import MultiImageField from '../components/MultiImageField';
import BulkUploadModal from '../components/BulkUploadModal';
import { getImageUrl } from '../../utils/helpers';
import '../components/upload.css';

function toFormValue(field, raw) {
  if (field.type === 'checkbox') return Boolean(raw);
  if (field.type === 'password') return '';
  if (raw === undefined || raw === null) return '';
  if (field.type === 'date') return String(raw).slice(0, 10);
  if (typeof raw === 'object' && raw._id) return raw._id; // populated reference
  return raw;
}

function formFromRecord(fields, record) {
  return Object.fromEntries(fields.map((f) => [f.key, toFormValue(f, record?.[f.key])]));
}

function buildPayload(fields, formData) {
  const payload = {};
  fields.forEach((field) => {
    const value = formData[field.key];
    switch (field.type) {
      case 'checkbox':
        payload[field.key] = Boolean(value);
        break;
      case 'number':
        if (value !== '' && value !== null && value !== undefined) payload[field.key] = Number(value);
        break;
      case 'select':
      case 'date':
      case 'password':
        if (value) payload[field.key] = value;
        break;
      default:
        payload[field.key] = typeof value === 'string' ? value.trim() : (value ?? '');
    }
  });
  return payload;
}

function cellText(item, column) {
  if (column.render) return column.render(item);
  const value = item[column.key];
  if (value && typeof value === 'object') return value.title || value.name || '';
  return String(value ?? '').slice(0, 60);
}

const isEmpty = (value) => value === '' || value === null || value === undefined;

/**
 * Reusable CRUD Page — powers ALL admin modules.
 * Props:
 *  - title, endpoint, columns, fields, defaultValues
 *  - bulkUpload: { categoryField, categoryEndpoint } enables the bulk photo import button
 *  - allowToggle: show publish/draft toggle (default true)
 *  - allowBulkDelete: show row checkboxes + "Delete selected" (default true)
 * Field types: text, textarea, number, date, checkbox, password,
 *  select (options or optionsEndpoint + optionLabel), image (optional crop: { aspect }), images (multiple)
 */
export default function CrudPage({ title, endpoint, columns, fields, defaultValues = {}, bulkUpload, allowToggle = true, allowBulkDelete = true }) {
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [busyUploads, setBusyUploads] = useState(0);
  const [confirm, setConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState(() => new Set());
  const [showBulk, setShowBulk] = useState(false);
  const [options, setOptions] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const res = await adminApi.getAll(endpoint);
      setItems(Array.isArray(res.data) ? res.data : []);
      setLoadError(null);
    } catch (err) {
      setLoadError(getErrorMessage(err, 'Could not load items'));
    }
    setLoading(false);
  }, [endpoint]);

  useEffect(() => {
    let cancelled = false;
    adminApi.getAll(endpoint)
      .then((res) => { if (!cancelled) { setItems(Array.isArray(res.data) ? res.data : []); setLoadError(null); } })
      .catch((err) => { if (!cancelled) setLoadError(getErrorMessage(err, 'Could not load items')); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [endpoint]);

  // Load dropdown options that come from another module (e.g. gallery categories)
  const optionSources = useMemo(() => fields.filter((f) => f.optionsEndpoint), [fields]);
  useEffect(() => {
    let cancelled = false;
    optionSources.forEach((field) => {
      adminApi.getAll(field.optionsEndpoint)
        .then((res) => {
          if (cancelled) return;
          const list = (Array.isArray(res.data) ? res.data : []).map((o) => ({
            value: o._id,
            label: o[field.optionLabel || 'title'] || o.name || o._id,
          }));
          setOptions((prev) => ({ ...prev, [field.key]: list }));
        })
        .catch(() => { if (!cancelled) setOptions((prev) => ({ ...prev, [field.key]: [] })); });
    });
    return () => { cancelled = true; };
  }, [optionSources]);

  const trackBusy = useCallback((busy) => setBusyUploads((count) => Math.max(0, count + (busy ? 1 : -1))), []);
  const handleField = (key, value) => setFormData((d) => ({ ...d, [key]: value }));

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditItem(null);
    setFormData({});
  }, []);

  const canCloseForm = !saving && busyUploads === 0;

  // Escape closes dialogs (never while saving, uploading or deleting)
  useEffect(() => {
    if (!showForm && !confirm) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (confirm) { if (!deleting) setConfirm(null); }
      else if (canCloseForm) closeForm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showForm, confirm, deleting, canCloseForm, closeForm]);

  const openCreate = () => {
    setEditItem(null);
    setFormData(formFromRecord(fields, defaultValues));
    setShowForm(true);
  };

  // Always load the full record: list endpoints can return summaries (e.g. gurus without
  // biography/gallery), and saving a summary would wipe the missing fields.
  const openEdit = async (item) => {
    setEditItem(item);
    setFormData(formFromRecord(fields, item));
    setShowForm(true);
    setFormLoading(true);
    try {
      const res = await adminApi.getOne(endpoint, item._id);
      setFormData(formFromRecord(fields, res.data || item));
    } catch (err) {
      addToast(getErrorMessage(err, 'Could not load this record. Please try again.'), 'error');
      closeForm();
    } finally {
      setFormLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (busyUploads > 0) {
      addToast('Please wait for image uploads to finish', 'info');
      return;
    }
    const missing = fields.find((f) => f.required && !(f.type === 'password' && editItem) && isEmpty(formData[f.key]));
    if (missing) {
      addToast(`${missing.label} is required`, 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = buildPayload(fields, formData);
      if (editItem) {
        await adminApi.update(endpoint, editItem._id, payload);
        addToast('Updated successfully', 'success');
      } else {
        await adminApi.create(endpoint, payload);
        addToast('Created successfully', 'success');
      }
      closeForm();
      fetchData();
    } catch (err) {
      addToast(getErrorMessage(err, 'Save failed'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    const { ids } = confirm;
    setDeleting(true);
    try {
      if (ids.length === 1) await adminApi.remove(endpoint, ids[0]);
      else await adminApi.bulkDelete(endpoint, ids);
      addToast(ids.length === 1 ? 'Deleted' : `${ids.length} items deleted`, 'success');
      setItems((list) => list.filter((i) => !ids.includes(i._id)));
      setSelected((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      });
      setConfirm(null);
    } catch (err) {
      addToast(getErrorMessage(err, 'Delete failed'), 'error');
      fetchData();
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (item) => {
    try {
      const res = await adminApi.toggleStatus(endpoint, item._id);
      const status = res.data?.status || (item.status === 'published' ? 'draft' : 'published');
      setItems((list) => list.map((i) => (i._id === item._id ? { ...i, status } : i)));
      addToast(`Marked as ${status}`, 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Status update failed'), 'error');
    }
  };

  const filtered = useMemo(() => {
    if (!search) return items;
    const s = search.toLowerCase();
    return items.filter((item) => columns.some((c) => String(cellText(item, c)).toLowerCase().includes(s)));
  }, [items, search, columns]);

  const selectedIds = items.filter((i) => selected.has(i._id)).map((i) => i._id);
  const allSelected = filtered.length > 0 && filtered.every((i) => selected.has(i._id));

  const toggleAll = () => setSelected((prev) => {
    const next = new Set(prev);
    filtered.forEach((i) => { if (allSelected) next.delete(i._id); else next.add(i._id); });
    return next;
  });

  const toggleOne = (id) => setSelected((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

  const imageColumns = new Set(columns.filter((c) => c.type === 'image' || c.key === 'image').map((c) => c.key));

  const renderFieldInput = (field) => {
    const val = formData[field.key] ?? '';
    const set = (value) => handleField(field.key, value);

    switch (field.type) {
      case 'textarea':
        return <textarea className="admin-form__input admin-form__textarea" value={val} onChange={(e) => set(e.target.value)} />;
      case 'image':
        return <ImageField value={val} onChange={set} crop={field.crop} onBusyChange={trackBusy} />;
      case 'images':
        return <MultiImageField value={val} onChange={set} onBusyChange={trackBusy} />;
      case 'select': {
        const list = field.optionsEndpoint ? (options[field.key] || []) : (field.options || []);
        const stillLoading = field.optionsEndpoint && !options[field.key];
        return (
          <select className="admin-form__input admin-form__select" value={val} onChange={(e) => set(e.target.value)}>
            <option value="">{stillLoading ? 'Loading…' : '-- Select --'}</option>
            {list.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        );
      }
      case 'number':
        return <input type="number" className="admin-form__input" value={val} onChange={(e) => set(e.target.value)} />;
      case 'date':
        return <input type="date" className="admin-form__input" value={val} onChange={(e) => set(e.target.value)} />;
      case 'checkbox':
        return (
          <label className="admin-form__checkbox">
            <input type="checkbox" checked={Boolean(val)} onChange={(e) => set(e.target.checked)} /> {field.label}
          </label>
        );
      case 'password':
        return (
          <input
            type="password"
            className="admin-form__input"
            autoComplete="new-password"
            placeholder={editItem ? 'Leave blank to keep the current password' : 'At least 6 characters'}
            value={val}
            onChange={(e) => set(e.target.value)}
          />
        );
      default:
        return <input type="text" className="admin-form__input" value={val} onChange={(e) => set(e.target.value)} />;
    }
  };

  const submitLabel = saving ? 'Saving…' : busyUploads > 0 ? 'Waiting for uploads…' : editItem ? 'Update' : 'Create';

  return (
    <>
      <div className="crud-header">
        <h2>{title}</h2>
        <div className="crud-header__actions">
          {bulkUpload && (
            <button type="button" className="btn-admin btn-admin--outline" onClick={() => setShowBulk(true)}>
              <Upload size={16} /> Bulk upload photos
            </button>
          )}
          <button type="button" className="btn-admin btn-admin--primary" onClick={openCreate}>
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <input className="admin-table-search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="crud-toolbar__right">
            {allowBulkDelete && selectedIds.length > 0 && (
              <button
                type="button"
                className="btn-admin btn-admin--danger btn-admin--sm"
                onClick={() => setConfirm({ ids: selectedIds, label: `${selectedIds.length} selected items` })}
              >
                <Trash2 size={14} /> Delete selected ({selectedIds.length})
              </button>
            )}
            <button
              type="button"
              className="btn-admin btn-admin--outline btn-admin--sm"
              onClick={() => { setLoading(true); fetchData(); }}
              title="Refresh"
              aria-label="Refresh"
            >
              <RotateCw size={14} />
            </button>
            <span className="crud-count">{filtered.length} items</span>
          </div>
        </div>

        {loading ? (
          <div className="crud-state">Loading...</div>
        ) : loadError ? (
          <div className="crud-state crud-state--error">
            {loadError}
            <button type="button" className="btn-admin btn-admin--outline btn-admin--sm" onClick={() => { setLoading(true); fetchData(); }}>Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="crud-state">No items found. Click "Add New" to create one.</div>
        ) : (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  {allowBulkDelete && (
                    <th className="crud-check">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Select all" />
                    </th>
                  )}
                  <th>#</th>
                  {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                  {allowToggle && <th>Status</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={item._id} className={selected.has(item._id) ? 'is-selected' : ''}>
                    {allowBulkDelete && (
                      <td className="crud-check">
                        <input type="checkbox" checked={selected.has(item._id)} onChange={() => toggleOne(item._id)} aria-label="Select row" />
                      </td>
                    )}
                    <td>{i + 1}</td>
                    {columns.map((c) => (
                      <td key={c.key}>
                        {imageColumns.has(c.key) ? (
                          item[c.key] ? (
                            <img
                              src={getImageUrl(item[c.key], 120)}
                              alt=""
                              className="admin-table__img"
                              loading="lazy"
                              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                            />
                          ) : <span className="crud-muted">—</span>
                        ) : cellText(item, c)}
                      </td>
                    ))}
                    {allowToggle && (
                      <td>
                        <span className={`status-badge status-badge--${item.status || 'published'}`}>{item.status || 'published'}</span>
                      </td>
                    )}
                    <td>
                      <div className="admin-table__actions">
                        <button type="button" className="btn-admin btn-admin--outline btn-admin--sm" onClick={() => openEdit(item)} title="Edit" aria-label="Edit">
                          <Edit2 size={14} />
                        </button>
                        {allowToggle && (
                          <button
                            type="button"
                            className="btn-admin btn-admin--outline btn-admin--sm"
                            onClick={() => handleToggle(item)}
                            title={item.status === 'draft' ? 'Publish' : 'Move to draft'}
                            aria-label="Toggle status"
                          >
                            {item.status === 'draft' ? <ToggleLeft size={14} /> : <ToggleRight size={14} />}
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-admin btn-admin--danger btn-admin--sm"
                          onClick={() => setConfirm({ ids: [item._id], label: item.title || item.name || item.full_name || item.email || 'this item' })}
                          title="Delete"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {confirm && (
        <div className="admin-modal-overlay" onClick={() => { if (!deleting) setConfirm(null); }}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="alertdialog" aria-modal="true">
            <h3>⚠️ Delete {confirm.ids.length > 1 ? `${confirm.ids.length} items` : 'item'}?</h3>
            <p>Are you sure you want to delete <strong>{confirm.label}</strong>? This action cannot be undone.</p>
            <div className="admin-modal__actions">
              <button type="button" className="btn-admin btn-admin--outline" onClick={() => setConfirm(null)} disabled={deleting}>Cancel</button>
              <button type="button" className="btn-admin btn-admin--danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / edit form */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => { if (canCloseForm) closeForm(); }}>
          <div className="admin-modal admin-modal--form" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="admin-modal__header">
              <div>
                <h3>{editItem ? `Edit ${title}` : `Create ${title}`}</h3>
                <p>{editItem ? 'Update the selected record details.' : 'Add a new record to this module.'}</p>
              </div>
              <button type="button" className="admin-modal__close" onClick={closeForm} disabled={!canCloseForm} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            {formLoading && <p className="admin-form__loading">Loading the full record…</p>}
            <form className="admin-form admin-form--modal" onSubmit={handleSave}>
              <fieldset className="admin-form__fieldset" disabled={formLoading || saving}>
                <div className="admin-form__grid">
                  {fields.map((field) => (
                    <div key={field.key} className={`admin-form__group ${field.fullWidth || field.type === 'image' || field.type === 'images' ? 'admin-form__group--full' : ''}`}>
                      {field.type !== 'checkbox' && (
                        <label className="admin-form__label">{field.label}{field.required ? ' *' : ''}</label>
                      )}
                      {renderFieldInput(field)}
                      {field.hint && <p className="admin-form__hint">{field.hint}</p>}
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className="admin-form__actions">
                <button type="submit" className="btn-admin btn-admin--primary" disabled={saving || formLoading || busyUploads > 0}>
                  {submitLabel}
                </button>
                <button type="button" className="btn-admin btn-admin--outline" onClick={closeForm} disabled={!canCloseForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showBulk && bulkUpload && (
        <BulkUploadModal
          endpoint={endpoint}
          categoryField={bulkUpload.categoryField}
          categoryEndpoint={bulkUpload.categoryEndpoint}
          onClose={() => setShowBulk(false)}
          onDone={fetchData}
        />
      )}
    </>
  );
}

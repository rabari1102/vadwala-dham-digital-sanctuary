import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import adminApi, { getErrorMessage } from '../hooks/adminApi';
import ImageField from '../components/ImageField';
import '../components/upload.css';

/**
 * Singleton form page — for Settings, Contact (single document, no list view).
 * Saves with PUT /<endpoint> (these routes have no :id).
 */
export default function SingletonPage({ title, endpoint, fields }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [busyUploads, setBusyUploads] = useState(0);

  useEffect(() => {
    let cancelled = false;
    adminApi.getSingleton(endpoint)
      .then((r) => {
        if (cancelled) return;
        const data = Array.isArray(r.data) ? r.data[0] || {} : r.data || {};
        setFormData(data);
      })
      .catch((err) => { if (!cancelled) setLoadError(getErrorMessage(err, 'Could not load data')); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [endpoint]);

  const trackBusy = useCallback((busy) => setBusyUploads((count) => Math.max(0, count + (busy ? 1 : -1))), []);
  const handleField = (key, value) => setFormData((d) => ({ ...d, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (busyUploads > 0) {
      addToast('Please wait for image uploads to finish', 'info');
      return;
    }
    setSaving(true);
    try {
      // Only send the fields this page edits, so other data on the document is untouched
      const payload = Object.fromEntries(fields.map((f) => [f.key, typeof formData[f.key] === 'string' ? formData[f.key].trim() : (formData[f.key] ?? '')]));
      const res = await adminApi.updateSingleton(endpoint, payload);
      if (res.data && typeof res.data === 'object') setFormData(res.data);
      addToast('Saved!', 'success');
    } catch (err) {
      addToast(getErrorMessage(err, 'Save failed'), 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="crud-state">Loading...</div>;
  if (loadError) return <div className="crud-state crud-state--error">{loadError}</div>;

  return (
    <>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{title}</h2>
      <form className="admin-form" onSubmit={handleSave}>
        <fieldset className="admin-form__fieldset" disabled={saving}>
          <div className="admin-form__grid">
            {fields.map((field) => (
              <div key={field.key} className={`admin-form__group ${field.fullWidth || field.type === 'image' ? 'admin-form__group--full' : ''}`}>
                <label className="admin-form__label">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea className="admin-form__input admin-form__textarea" value={formData[field.key] || ''} onChange={(e) => handleField(field.key, e.target.value)} />
                ) : field.type === 'image' ? (
                  <ImageField value={formData[field.key] || ''} onChange={(v) => handleField(field.key, v)} crop={field.crop} onBusyChange={trackBusy} />
                ) : (
                  <input className="admin-form__input" value={formData[field.key] || ''} onChange={(e) => handleField(field.key, e.target.value)} />
                )}
              </div>
            ))}
          </div>
        </fieldset>
        <div className="admin-form__actions">
          <button type="submit" className="btn-admin btn-admin--primary" disabled={saving || busyUploads > 0}>
            {saving ? 'Saving...' : busyUploads > 0 ? 'Waiting for uploads…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  );
}

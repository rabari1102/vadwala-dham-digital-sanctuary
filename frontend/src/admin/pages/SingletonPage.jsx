import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import adminApi from '../hooks/adminApi';

/**
 * Singleton form page — for Settings, Contact (single document, no list view).
 */
export default function SingletonPage({ title, endpoint, fields }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getSingleton(endpoint)
      .then(r => {
        const data = Array.isArray(r.data) ? r.data[0] || {} : r.data || {};
        setFormData(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [endpoint]);

  const handleField = (key, value) => setFormData(d => ({ ...d, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (formData._id) {
        await adminApi.update(endpoint, formData._id, formData);
      } else {
        await adminApi.create(endpoint, formData);
      }
      addToast('Saved!', 'success');
    } catch (err) { addToast(err.response?.data?.error || 'Save failed', 'error'); }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{title}</h2>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-form__grid">
          {fields.map(field => (
            <div key={field.key} className={`admin-form__group ${field.fullWidth ? 'admin-form__group--full' : ''}`}>
              <label className="admin-form__label">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea className="admin-form__input admin-form__textarea" value={formData[field.key] || ''} onChange={e => handleField(field.key, e.target.value)} />
              ) : field.type === 'image' ? (
                <>
                  <input className="admin-form__input" value={formData[field.key] || ''} onChange={e => handleField(field.key, e.target.value)} placeholder="Image URL" />
                  {formData[field.key] && <img src={formData[field.key]} alt="" className="admin-form__img-preview" />}
                </>
              ) : (
                <input className="admin-form__input" value={formData[field.key] || ''} onChange={e => handleField(field.key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
        <div className="admin-form__actions">
          <button type="submit" className="btn-admin btn-admin--primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </>
  );
}

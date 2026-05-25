import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import adminApi from '../hooks/adminApi';
import ImageCropperModal from '../components/ImageCropperModal';

/**
 * Singleton form page — for Settings, Contact (single document, no list view).
 */
export default function SingletonPage({ title, endpoint, fields }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cropFile, setCropFile] = useState(null);
  const [cropField, setCropField] = useState(null);

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

  const handleFileUpload = async (key, file) => {
    if (!file) return;
    try {
      addToast('Uploading image...', 'info');
      const res = await adminApi.upload(file);
      handleField(key, res.data.url);
      addToast('Image uploaded successfully!', 'success');
    } catch (err) {
      addToast(err.response?.data?.error || 'Upload failed', 'error');
    }
  };

  const handleImagePicker = (key, file) => {
    if (!file) return;
    setCropField(key);
    setCropFile(file);
  };

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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input className="admin-form__input" value={formData[field.key] || ''} onChange={e => handleField(field.key, e.target.value)} placeholder="Image URL" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="file" accept="image/*" onChange={e => handleImagePicker(field.key, e.target.files[0])} style={{ fontSize: '0.85rem', color: 'var(--admin-text-light)' }} />
                    {formData[field.key] && (
                      <button
                        type="button"
                        onClick={() => handleField(field.key, '')}
                        className="btn-admin btn-admin--danger btn-admin--sm"
                        style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {formData[field.key] && <img src={formData[field.key]} alt="" className="admin-form__img-preview" onError={e => { e.target.style.display = 'none'; }} />}
                </div>
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

      {cropFile && (
        <ImageCropperModal
          file={cropFile}
          onCancel={() => {
            setCropFile(null);
            setCropField(null);
          }}
          onSave={async (croppedFile) => {
            setCropFile(null);
            const fieldKey = cropField;
            setCropField(null);
            await handleFileUpload(fieldKey, croppedFile);
          }}
        />
      )}
    </>
  );
}

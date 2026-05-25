import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import adminApi from '../hooks/adminApi';
import { Plus, Edit2, Trash2, X, ToggleLeft, ToggleRight } from 'lucide-react';
import ImageCropperModal from '../components/ImageCropperModal';

/**
 * Reusable CRUD Page — powers ALL admin modules.
 * Props:
 *  - title: Page title
 *  - endpoint: API endpoint (e.g. 'banners')
 *  - columns: Array of { key, label, render? }
 *  - fields: Array of { key, label, type, options?, required?, fullWidth? }
 *  - defaultValues: Object with default field values for new items
 */
export default function CrudPage({ title, endpoint, columns, fields, defaultValues = {} }) {
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [cropFile, setCropFile] = useState(null);
  const [cropField, setCropField] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAll(endpoint);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch { setItems([]); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [endpoint]);

  const openCreate = () => {
    setEditItem(null);
    const initial = {};
    fields.forEach(f => { initial[f.key] = defaultValues[f.key] ?? ''; });
    setFormData(initial);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    const data = {};
    fields.forEach(f => { data[f.key] = item[f.key] ?? ''; });
    setFormData(data);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await adminApi.update(endpoint, editItem._id, formData);
        addToast('Updated successfully!', 'success');
      } else {
        await adminApi.create(endpoint, formData);
        addToast('Created successfully!', 'success');
      }
      setShowForm(false);
      fetchData();
    } catch (err) { addToast(err.response?.data?.error || 'Save failed', 'error'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    try {
      await adminApi.remove(endpoint, deleteId);
      addToast('Deleted!', 'success');
      setDeleteId(null);
      fetchData();
    } catch { addToast('Delete failed', 'error'); }
  };

  const handleToggle = async (id) => {
    try {
      await adminApi.toggleStatus(endpoint, id);
      addToast('Status updated!', 'success');
      fetchData();
    } catch { addToast('Toggle failed', 'error'); }
  };

  const handleField = (key, value) => setFormData(d => ({ ...d, [key]: value }));
  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    setEditItem(null);
    setFormData({});
  };

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

  const handleTextAreaFileUpload = async (key, files) => {
    if (!files || files.length === 0) return;
    try {
      addToast(`Uploading ${files.length} image(s)...`, 'info');
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const res = await adminApi.upload(files[i]);
        urls.push(res.data.url);
      }
      setFormData(prev => {
        const currentVal = prev[key] || '';
        const currentLines = currentVal.split('\n').map(l => l.trim()).filter(Boolean);
        const newLines = [...currentLines, ...urls];
        return {
          ...prev,
          [key]: newLines.join('\n')
        };
      });
      addToast('Images uploaded and added successfully!', 'success');
    } catch (err) {
      addToast(err.response?.data?.error || 'Upload failed', 'error');
    }
  };

  const handleImagePicker = (key, file) => {
    if (!file) return;
    setCropField(key);
    setCropFile(file);
  };

  const filtered = items.filter(item => {
    if (!search) return true;
    const s = search.toLowerCase();
    return columns.some(c => {
      const val = item[c.key];
      return val && String(val).toLowerCase().includes(s);
    });
  });

  const renderFieldInput = (field) => {
    const val = formData[field.key] ?? '';
    switch (field.type) {
      case 'textarea':
        const isGallery = field.key.includes('images') || field.key.includes('gallery');
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <textarea className="admin-form__input admin-form__textarea" value={val} onChange={e => handleField(field.key, e.target.value)} required={field.required} />
            {isGallery && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--admin-text-light)' }}>📷 Upload & Add Gallery Images</span>
                  <input type="file" accept="image/*" multiple onChange={e => handleTextAreaFileUpload(field.key, e.target.files)} style={{ fontSize: '0.8rem', color: 'var(--admin-text-light)' }} />
                </div>
                {val && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                    {val.split('\n').map(l => l.trim()).filter(Boolean).map((url, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                        <button
                          type="button"
                          onClick={() => {
                            const remaining = val.split('\n').map(l => l.trim()).filter(Boolean);
                            remaining.splice(idx, 1);
                            handleField(field.key, remaining.join('\n'));
                          }}
                          style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '16px',
                            height: '16px',
                            fontSize: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            lineHeight: 1,
                            padding: 0
                          }}
                          title="Remove Image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      case 'select':
        return (
          <select className="admin-form__input admin-form__select" value={val} onChange={e => handleField(field.key, e.target.value)}>
            <option value="">-- Select --</option>
            {(field.options || []).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        );
      case 'number':
        return <input type="number" className="admin-form__input" value={val} onChange={e => handleField(field.key, e.target.value)} required={field.required} />;
      case 'date':
        return <input type="date" className="admin-form__input" value={val ? val.slice(0, 10) : ''} onChange={e => handleField(field.key, e.target.value)} />;
      case 'checkbox':
        return <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" checked={!!val} onChange={e => handleField(field.key, e.target.checked)} /> {field.label}</label>;
      case 'image':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input type="text" className="admin-form__input" value={val} onChange={e => handleField(field.key, e.target.value)} placeholder="Image URL" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="file" accept="image/*" onChange={e => handleImagePicker(field.key, e.target.files[0])} style={{ fontSize: '0.85rem', color: 'var(--admin-text-light)' }} />
              {val && (
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
            {val && <img src={val} alt="" className="admin-form__img-preview" onError={e => { e.target.style.display = 'none'; }} />}
          </div>
        );
      default:
        return <input type="text" className="admin-form__input" value={val} onChange={e => handleField(field.key, e.target.value)} required={field.required} />;
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ fontSize: '1.2rem' }}>{title}</h2>
        <button className="btn-admin btn-admin--primary" onClick={openCreate}><Plus size={16} /> Add New</button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <input className="admin-table-search" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-light)' }}>{filtered.length} items</span>
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>No items found. Click "Add New" to create one.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                {columns.map(c => <th key={c.key}>{c.label}</th>)}
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  {columns.map(c => (
                    <td key={c.key}>
                      {c.render ? c.render(item) :
                        c.key === 'image' && item[c.key] ? <img src={item[c.key]} alt="" className="admin-table__img" onError={e => { e.target.src = ''; e.target.alt = '🖼️'; }} /> :
                        String(item[c.key] ?? '').slice(0, 60)}
                    </td>
                  ))}
                  <td>
                    <span className={`status-badge status-badge--${item.status || 'published'}`}>
                      {item.status || 'published'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="btn-admin btn-admin--outline btn-admin--sm" onClick={() => openEdit(item)} title="Edit"><Edit2 size={14} /></button>
                      <button className="btn-admin btn-admin--outline btn-admin--sm" onClick={() => handleToggle(item._id)} title="Toggle Status">
                        {item.status === 'published' ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      </button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => setDeleteId(item._id)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>⚠️ Delete Confirmation</h3>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="admin-modal__actions">
              <button className="btn-admin btn-admin--outline" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-admin btn-admin--danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal admin-modal--form" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <div>
                <h3>{editItem ? `Edit ${title}` : `Create ${title}`}</h3>
                <p>{editItem ? 'Update the selected record details.' : 'Add a new record to this module.'}</p>
              </div>
              <button type="button" className="admin-modal__close" onClick={closeForm} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <form className="admin-form admin-form--modal" onSubmit={handleSave}>
              <div className="admin-form__grid">
                {fields.map(field => (
                  <div key={field.key} className={`admin-form__group ${field.fullWidth ? 'admin-form__group--full' : ''}`}>
                    {field.type !== 'checkbox' && <label className="admin-form__label">{field.label}</label>}
                    {renderFieldInput(field)}
                  </div>
                ))}
              </div>
              <div className="admin-form__actions">
                <button type="submit" className="btn-admin btn-admin--primary" disabled={saving}>
                  {saving ? 'Saving...' : editItem ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn-admin btn-admin--outline" onClick={closeForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

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

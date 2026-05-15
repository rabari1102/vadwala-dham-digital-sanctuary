import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import adminApi from '../hooks/adminApi';
import { Plus, Edit2, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

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
        return <textarea className="admin-form__input admin-form__textarea" value={val} onChange={e => handleField(field.key, e.target.value)} required={field.required} />;
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
          <>
            <input type="text" className="admin-form__input" value={val} onChange={e => handleField(field.key, e.target.value)} placeholder="Image URL" />
            {val && <img src={val} alt="" className="admin-form__img-preview" onError={e => { e.target.style.display = 'none'; }} />}
          </>
        );
      default:
        return <input type="text" className="admin-form__input" value={val} onChange={e => handleField(field.key, e.target.value)} required={field.required} />;
    }
  };

  // ── LIST VIEW ──
  if (!showForm) return (
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
    </>
  );

  // ── FORM VIEW ──
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem' }}>{editItem ? `Edit ${title}` : `Create ${title}`}</h2>
        <button className="btn-admin btn-admin--outline" onClick={() => setShowForm(false)}>← Back to List</button>
      </div>
      <form className="admin-form" onSubmit={handleSave}>
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
          <button type="button" className="btn-admin btn-admin--outline" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      </form>
    </>
  );
}

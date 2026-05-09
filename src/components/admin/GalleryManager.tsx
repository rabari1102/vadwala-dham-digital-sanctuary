import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface GalleryItem {
  _id: string;
  imageUrl: string;
  cat: string;
  catEn?: string;
  tag: string;
  order: number;
}

const TAGS = ['janmashtami', 'diwali', 'gurupurnima', 'gaushala', 'education', 'temple', 'other'];
const EMPTY = { imageUrl: '', cat: '', catEn: '', tag: 'temple', order: 0 };

interface Props { token: string; }

export default function GalleryManager({ token }: Props) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/gallery`);
      if (res.ok) setItems(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl || !form.cat) { toast.error('Image URL and category are required'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/gallery`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Image added to gallery!');
        setForm({ ...EMPTY });
        load();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to add image');
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this image from gallery?')) return;
    const res = await fetch(`${BASE_URL}/admin/gallery/${id}`, { method: 'DELETE', headers });
    if (res.ok) { toast.success('Image removed'); load(); }
    else toast.error('Failed to remove image');
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-gray-800 mb-6">🖼️ Gallery Manager</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="bg-orange-50 rounded-2xl border border-orange-200 p-5 mb-8 grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Image URL *</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required className="admin-input" placeholder="https://example.com/image.jpg or /gallery/photo.jpg" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Category (Gujarati) *</label>
          <input name="cat" value={form.cat} onChange={handleChange} required className="admin-input" placeholder="જન્માષ્ટમી મહોત્સવ" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Category (English)</label>
          <input name="catEn" value={form.catEn} onChange={handleChange} className="admin-input" placeholder="Janmashtami Festival" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Tag</label>
          <select name="tag" value={form.tag} onChange={handleChange} className="admin-input">
            {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Order</label>
          <input name="order" type="number" value={form.order} onChange={handleChange} className="admin-input" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" disabled={saving} className="btn-saffron text-sm py-2.5">
            {saving ? 'Saving…' : '➕ Add to Gallery'}
          </button>
        </div>
      </form>

      {/* Preview URL */}
      {form.imageUrl && (
        <div className="mb-6 rounded-xl overflow-hidden border border-orange-200 max-w-xs">
          <img src={form.imageUrl} alt="Preview" className="w-full h-40 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-3 gap-3 animate-pulse">{[...Array(6)].map((_, i) => <div key={i} className="aspect-square bg-orange-50 rounded-xl" />)}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((item) => (
            <div key={item._id} className="group relative aspect-square rounded-xl overflow-hidden border border-orange-100 shadow-sm">
              <img src={item.imageUrl} alt={item.cat} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-white text-xs text-center font-medium leading-tight">{item.cat}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">No gallery images found.</p>}
        </div>
      )}
    </div>
  );
}

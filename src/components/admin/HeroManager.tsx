import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface HeroSlide {
  _id: string;
  imageUrl: string;
  tagline: string;
  taglineEn?: string;
  order: number;
}

const EMPTY: Omit<HeroSlide, '_id'> = { imageUrl: '', tagline: '', taglineEn: '', order: 0 };

interface Props { token: string; }

export default function HeroManager({ token }: Props) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...EMPTY });
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState('');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/hero`);
      if (res.ok) setSlides(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'order' ? Number(value) : value }));
    if (name === 'imageUrl') setPreview(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl.trim()) { toast.error('Image URL is required'); return; }
    setSaving(true);
    try {
      const url = editing ? `${BASE_URL}/admin/hero/${editing}` : `${BASE_URL}/admin/hero`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(editing ? 'Slide updated!' : 'Slide added!');
        setForm({ ...EMPTY });
        setEditing(null);
        setPreview('');
        load();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to save');
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    const res = await fetch(`${BASE_URL}/admin/hero/${id}`, { method: 'DELETE', headers });
    if (res.ok) { toast.success('Slide deleted'); load(); }
    else toast.error('Failed to delete');
  };

  const startEdit = (slide: HeroSlide) => {
    setEditing(slide._id);
    setForm({ imageUrl: slide.imageUrl, tagline: slide.tagline, taglineEn: slide.taglineEn || '', order: slide.order });
    setPreview(slide.imageUrl);
  };

  const cancelEdit = () => { setEditing(null); setForm({ ...EMPTY }); setPreview(''); };

  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-gray-800 mb-2">🖼️ Hero Slideshow Manager</h2>
      <p className="text-sm text-gray-500 mb-6">Add/edit the full-screen background slides shown on the homepage hero.</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-orange-50 rounded-2xl border border-orange-200 p-5 mb-8 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Image URL *</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
            className="admin-input"
            placeholder="https://example.com/temple-photo.jpg"
          />
          {preview && (
            <div className="mt-2 rounded-xl overflow-hidden border border-orange-200 h-40">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setPreview('')}
              />
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Tagline (Gujarati) *</label>
            <textarea
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              required
              rows={2}
              className="admin-input resize-none"
              placeholder="૫૦૦ વર્ષ જૂની આ પ્રાચીન ભૂમિ..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Tagline (English)</label>
            <textarea
              name="taglineEn"
              value={form.taglineEn}
              onChange={handleChange}
              rows={2}
              className="admin-input resize-none"
              placeholder="A 500-year-old spiritual legacy..."
            />
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="w-28">
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Order</label>
            <input name="order" type="number" value={form.order} onChange={handleChange} className="admin-input" />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="btn-saffron text-sm py-2.5">
              {saving ? 'Saving…' : editing ? '✏️ Update Slide' : '➕ Add Slide'}
            </button>
            {editing && (
              <button type="button" onClick={cancelEdit} className="btn-saffron-outline text-sm py-2.5">Cancel</button>
            )}
          </div>
        </div>
      </form>

      {/* Slides list */}
      {loading ? (
        <div className="animate-pulse space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-orange-50 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {slides.map((slide) => (
            <div key={slide._id} className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white px-4 py-3 shadow-sm">
              <div className="w-20 h-14 rounded-lg overflow-hidden border border-orange-100 flex-shrink-0 bg-orange-50">
                <img src={slide.imageUrl} alt="slide" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-gray-800 text-sm truncate">{slide.tagline}</p>
                <p className="text-xs text-gray-400 truncate">{slide.taglineEn || '—'} · order: {slide.order}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(slide)} className="text-xs px-3 py-1.5 rounded-lg border border-orange-300 text-orange-600 hover:bg-orange-50 transition">Edit</button>
                <button onClick={() => handleDelete(slide._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition">Delete</button>
              </div>
            </div>
          ))}
          {slides.length === 0 && <p className="text-center text-gray-400 py-8">No slides yet. Add one above!</p>}
        </div>
      )}
    </div>
  );
}

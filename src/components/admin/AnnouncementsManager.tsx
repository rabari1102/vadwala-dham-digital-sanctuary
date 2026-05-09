import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Announcement {
  _id: string;
  text: string;
  order: number;
}

const EMPTY = { text: '', order: 0 };

interface Props { token: string; }

export default function AnnouncementsManager({ token }: Props) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/announcements`);
      if (res.ok) setItems(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'order' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text.trim()) { toast.error('Announcement text is required'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/announcements`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Announcement added!');
        setForm({ ...EMPTY });
        load();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to save');
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    const res = await fetch(`${BASE_URL}/admin/announcements/${id}`, { method: 'DELETE', headers });
    if (res.ok) { toast.success('Deleted'); load(); }
    else toast.error('Failed to delete');
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-gray-800 mb-2">📢 Announcements Manager</h2>
      <p className="text-sm text-gray-500 mb-6">
        These announcements scroll in the orange ticker bar below the navigation on the homepage.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-orange-50 rounded-2xl border border-orange-200 p-5 mb-8">
        <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Announcement Text *</label>
            <input
              name="text"
              value={form.text}
              onChange={handleChange}
              required
              className="admin-input"
              placeholder="🙏 વડવાળા ધામ - ૧૧ ઓગસ્ટ ૨૦૨૪ ના રોજ વિશેષ ઉત્સવ..."
            />
          </div>
          <div className="w-24">
            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Order</label>
            <input name="order" type="number" value={form.order} onChange={handleChange} className="admin-input" />
          </div>
          <button type="submit" disabled={saving} className="btn-saffron text-sm py-2.5 whitespace-nowrap">
            {saving ? 'Saving…' : '➕ Add'}
          </button>
        </div>
      </form>

      {/* List */}
      {loading ? (
        <div className="animate-pulse space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-orange-50 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item._id} className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white px-4 py-3 shadow-sm">
              <span className="text-orange-400 font-bold text-sm w-6 flex-shrink-0">#{idx + 1}</span>
              <p className="flex-1 text-sm text-gray-700 font-medium">{item.text}</p>
              <span className="text-xs text-gray-400">order: {item.order}</span>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-gray-400 py-8">No announcements. Add one above!</p>}
        </div>
      )}
    </div>
  );
}

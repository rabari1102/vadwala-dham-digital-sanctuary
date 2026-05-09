import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Event {
  _id: string;
  icon: string;
  nameGuj: string;
  name: string;
  date: string;
  dateEn?: string;
  isUpcoming?: boolean;
  isActive?: boolean;
  order: number;
}

const EMPTY: Omit<Event, '_id'> = { icon: '🪔', nameGuj: '', name: '', date: '', dateEn: '', isUpcoming: false, isActive: true, order: 0 };

interface Props { token: string; }

export default function EventsManager({ token }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...EMPTY });
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/festivals`);
      if (res.ok) setEvents(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `${BASE_URL}/admin/events/${editing}` : `${BASE_URL}/admin/events`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(editing ? 'Event updated!' : 'Event added!');
        setForm({ ...EMPTY });
        setEditing(null);
        load();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to save event');
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    const res = await fetch(`${BASE_URL}/admin/events/${id}`, { method: 'DELETE', headers });
    if (res.ok) { toast.success('Event deleted'); load(); }
    else toast.error('Failed to delete');
  };

  const startEdit = (ev: Event) => {
    setEditing(ev._id);
    setForm({ icon: ev.icon, nameGuj: ev.nameGuj, name: ev.name, date: ev.date, dateEn: ev.dateEn || '', isUpcoming: ev.isUpcoming || false, isActive: ev.isActive !== false, order: ev.order });
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-gray-800 mb-6">🪔 Events Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-orange-50 rounded-2xl border border-orange-200 p-5 mb-8 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Icon (Emoji)</label>
          <input name="icon" value={form.icon} onChange={handleChange} className="admin-input" placeholder="🪔" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Order</label>
          <input name="order" type="number" value={form.order} onChange={handleChange} className="admin-input" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Name (Gujarati) *</label>
          <input name="nameGuj" value={form.nameGuj} onChange={handleChange} required className="admin-input" placeholder="જન્માષ્ટમી" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Name (English) *</label>
          <input name="name" value={form.name} onChange={handleChange} required className="admin-input" placeholder="Janmashtami" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Date (Gujarati)</label>
          <input name="date" value={form.date} onChange={handleChange} className="admin-input" placeholder="શ્રાવણ વદ ૮" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Date (English)</label>
          <input name="dateEn" value={form.dateEn} onChange={handleChange} className="admin-input" placeholder="Shravan Vad 8" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input type="checkbox" name="isUpcoming" checked={form.isUpcoming} onChange={handleChange} className="rounded" />
            Upcoming
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="rounded" />
            Active
          </label>
        </div>
        <div className="flex gap-2 items-end">
          <button type="submit" disabled={saving} className="btn-saffron text-sm py-2.5">
            {saving ? 'Saving…' : editing ? '✏️ Update Event' : '➕ Add Event'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ ...EMPTY }); }} className="btn-saffron-outline text-sm py-2.5">Cancel</button>
          )}
        </div>
      </form>

      {/* List */}
      {loading ? (
        <div className="animate-pulse space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-orange-50 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev._id} className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white px-4 py-3 shadow-sm">
              <span className="text-2xl">{ev.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-gray-800 text-sm">{ev.nameGuj}</p>
                <p className="text-xs text-gray-400">{ev.name} · {ev.date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(ev)} className="text-xs px-3 py-1.5 rounded-lg border border-orange-300 text-orange-600 hover:bg-orange-50 transition">Edit</button>
                <button onClick={() => handleDelete(ev._id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition">Delete</button>
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="text-center text-gray-400 py-8">No events found.</p>}
        </div>
      )}
    </div>
  );
}

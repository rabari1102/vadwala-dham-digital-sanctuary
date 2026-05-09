import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ContentItem {
  key: string;
  value: string;
  label?: string;
  type: string;
}

interface Props { token: string; }

export default function ContentEditor({ token }: Props) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/content`)
      .then((r) => r.json())
      .then((map: Record<string, string>) => {
        const list = Object.entries(map).map(([key, value]) => ({
          key,
          value: typeof value === 'string' ? value : JSON.stringify(value),
          type: 'text',
          label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        }));
        setItems(list);
        const initial: Record<string, string> = {};
        list.forEach((item) => { initial[item.key] = item.value; });
        setEditing(initial);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (key: string) => {
    setSaving(key);
    try {
      const res = await fetch(`${BASE_URL}/admin/content/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ value: editing[key], type: 'text' }),
      });
      if (res.ok) toast.success(`"${key}" updated!`);
      else { const err = await res.json(); toast.error(err.error || 'Failed to update'); }
    } finally { setSaving(null); }
  };

  if (loading) return (
    <div className="animate-pulse space-y-4">
      {[...Array(6)].map((_, i) => <div key={i} className="h-20 bg-orange-50 rounded-xl" />)}
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-gray-800 mb-2">📝 Site Content Editor</h2>
      <p className="text-sm text-gray-500 mb-6">Edit all website text content. Changes are saved to the database.</p>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.key} className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {item.label || item.key}
            </label>
            <code className="block text-[10px] text-orange-400 mb-2">{item.key}</code>
            {editing[item.key] && editing[item.key].length > 80 ? (
              <textarea
                value={editing[item.key] || ''}
                onChange={(e) => setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))}
                rows={3}
                className="admin-input resize-none mb-2"
              />
            ) : (
              <input
                value={editing[item.key] || ''}
                onChange={(e) => setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))}
                className="admin-input mb-2"
              />
            )}
            <button
              onClick={() => handleSave(item.key)}
              disabled={saving === item.key}
              className="text-xs btn-saffron py-1.5 px-4"
            >
              {saving === item.key ? 'Saving…' : '💾 Save'}
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-gray-400 py-8">No site content found. Run the seed script to populate.</p>
        )}
      </div>
    </div>
  );
}

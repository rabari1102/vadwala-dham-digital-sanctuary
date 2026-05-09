import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Props { token: string; }

export default function ContactMessages({ token }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/contact-messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setMessages(await res.json());
      else toast.error('Failed to load messages');
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: string) => {
    const res = await fetch(`${BASE_URL}/admin/contact-messages/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setMessages((prev) => prev.map((m) => m._id === id ? { ...m, isRead: true } : m));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-gray-800">📬 Contact Messages</h2>
        <button onClick={load} className="text-xs btn-saffron-outline py-1.5 px-4">🔄 Refresh</button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-orange-50 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`rounded-xl border p-5 shadow-sm transition ${msg.isRead ? 'bg-white border-gray-100' : 'bg-orange-50 border-orange-200'}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-heading font-bold text-gray-800">{msg.name}</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <a href={`mailto:${msg.email}`} className="text-xs text-orange-600 hover:underline">📧 {msg.email}</a>
                    {msg.phone && <a href={`tel:${msg.phone}`} className="text-xs text-orange-600 hover:underline">📞 {msg.phone}</a>}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  {!msg.isRead && (
                    <button onClick={() => markRead(msg._id)} className="mt-1 text-xs text-green-600 hover:text-green-700 font-semibold">✓ Mark as Read</button>
                  )}
                  {msg.isRead && <span className="text-xs text-gray-400">✓ Read</span>}
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed bg-white/70 rounded-lg p-3 border border-gray-100">{msg.message}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-gray-400">No contact messages yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

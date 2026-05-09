import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface DonationInfo {
  qrImageUrl: string;
  note: string;
  fcraEligible: boolean;
  phones: string[];
  purposes: { label: string; icon: string }[];
}

interface Props { token: string; }

export default function DonationsEditor({ token }: Props) {
  const [data, setData] = useState<DonationInfo>({
    qrImageUrl: '',
    note: '',
    fcraEligible: true,
    phones: ['', ''],
    purposes: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/donation`)
      .then((r) => r.json())
      .then((d) => {
        if (d) setData({
          qrImageUrl: d.qrImageUrl || '',
          note: d.note || '',
          fcraEligible: d.fcraEligible !== false,
          phones: d.phones?.length ? d.phones : ['', ''],
          purposes: d.purposes || [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/donations`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...data, phones: data.phones.filter(Boolean) }),
      });
      if (res.ok) toast.success('Donation info updated!');
      else { const err = await res.json(); toast.error(err.error || 'Failed to update'); }
    } finally { setSaving(false); }
  };

  const updatePhone = (i: number, v: string) => {
    setData((prev) => { const phones = [...prev.phones]; phones[i] = v; return { ...prev, phones }; });
  };

  const updatePurpose = (i: number, field: 'label' | 'icon', v: string) => {
    setData((prev) => {
      const purposes = [...prev.purposes];
      purposes[i] = { ...purposes[i], [field]: v };
      return { ...prev, purposes };
    });
  };

  const removePurpose = (i: number) => {
    setData((prev) => ({ ...prev, purposes: prev.purposes.filter((_, idx) => idx !== i) }));
  };

  const addPurpose = () => {
    setData((prev) => ({ ...prev, purposes: [...prev.purposes, { label: '', icon: '🙏' }] }));
  };

  if (loading) return <div className="animate-pulse space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-orange-50 rounded-xl" />)}</div>;

  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-gray-800 mb-6">💰 Donations Info Editor</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">QR Code Image URL</label>
          <input value={data.qrImageUrl} onChange={(e) => setData((p) => ({ ...p, qrImageUrl: e.target.value }))} className="admin-input" placeholder="https://..." />
          {data.qrImageUrl && (
            <div className="mt-3 w-40 h-40 rounded-xl overflow-hidden border border-orange-200">
              <img src={data.qrImageUrl} alt="QR" className="w-full h-full object-contain" />
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Note / Message</label>
          <input value={data.note} onChange={(e) => setData((p) => ({ ...p, note: e.target.value }))} className="admin-input" placeholder="Special note for donors..." />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Phone Numbers</label>
          <div className="space-y-2">
            {data.phones.map((phone, i) => (
              <input key={i} value={phone} onChange={(e) => updatePhone(i, e.target.value)} className="admin-input" placeholder={`Phone ${i + 1}`} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-gray-500 uppercase">Donation Purposes</label>
            <button type="button" onClick={addPurpose} className="text-xs text-orange-600 hover:text-orange-700 font-semibold">+ Add Purpose</button>
          </div>
          <div className="space-y-2">
            {data.purposes.map((p, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={p.icon} onChange={(e) => updatePurpose(i, 'icon', e.target.value)} className="admin-input w-16 text-center" placeholder="🙏" />
                <input value={p.label} onChange={(e) => updatePurpose(i, 'label', e.target.value)} className="admin-input flex-1" placeholder="Purpose label" />
                <button type="button" onClick={() => removePurpose(i)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={data.fcraEligible} onChange={(e) => setData((p) => ({ ...p, fcraEligible: e.target.checked }))} className="rounded" />
          <span className="text-sm font-medium text-gray-700">FCRA &amp; 80G Eligible</span>
        </label>

        <button type="submit" disabled={saving} className="btn-saffron">
          {saving ? '⏳ Saving…' : '💾 Save Donation Info'}
        </button>
      </form>
    </div>
  );
}

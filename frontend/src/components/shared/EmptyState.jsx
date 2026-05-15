export default function EmptyState({ message = 'હાલમાં કોઈ માહિતી ઉપલબ્ધ નથી', icon = '📭' }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <p style={{ fontSize: '1.05rem' }}>{message}</p>
    </div>
  );
}

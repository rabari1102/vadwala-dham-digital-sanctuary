export default function EmptyState({ message, icon }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '80px 24px',
      color: 'var(--color-on-surface-variant)',
    }}>
      {icon && <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>{icon}</span>}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-headline-md)',
        fontStyle: 'italic',
      }}>{message}</p>
    </div>
  );
}

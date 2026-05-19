export default function ChapterDivider() {
  return (
    <div style={{ padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '1px',
        height: '128px',
        background: 'var(--color-outline-variant)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-primary)',
        }} />
      </div>
    </div>
  );
}

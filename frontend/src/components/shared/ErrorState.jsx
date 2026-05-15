export default function ErrorState({ message = 'કંઈક ખોટું થયું. કૃપા કરી ફરી પ્રયાસ કરો.' }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-error)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
      <p style={{ fontSize: '1.05rem' }}>{message}</p>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '128px 24px',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '120px',
        lineHeight: 1,
        marginBottom: '16px',
        color: 'var(--color-primary)',
        opacity: 0.3,
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-headline-md)',
        fontStyle: 'italic',
        marginBottom: '12px',
      }}>
        Page Not Found
      </h1>
      <p style={{
        fontSize: 'var(--text-body-lg)',
        color: 'var(--color-on-surface-variant)',
        marginBottom: '32px',
        maxWidth: '400px',
      }} lang="gu">
        આ પૃષ્ઠ અસ્તિત્વમાં નથી અથવા ખસેડવામાં આવ્યું છે.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function LoginPage() {
  const { admin, login } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get('expired') === '1';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1>Vadwala Admin</h1>
        <p>Content Management System</p>
        {error
          ? <div className="admin-login__error" role="alert">{error}</div>
          : sessionExpired && <div className="admin-login__error" role="status">Your session expired. Please log in again.</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn-admin btn-admin--primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={loading || !email || !password}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

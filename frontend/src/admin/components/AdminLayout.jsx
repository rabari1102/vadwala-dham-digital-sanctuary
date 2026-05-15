import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar__title"></h1>
          <div className="admin-topbar__user">
            <div className="admin-topbar__avatar">{admin?.name?.charAt(0) || 'A'}</div>
            <span>{admin?.name || 'Admin'}</span>
            <button className="admin-topbar__logout" onClick={logout}>Logout</button>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

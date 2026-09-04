import { useEffect } from 'react';
import { Navigate } from 'react-router';

export default function LogoutView({ onLogout }) {

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/" />;
}

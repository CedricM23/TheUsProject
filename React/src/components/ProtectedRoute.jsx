import { Navigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function ProtectedRoute({ children }) {

  // Get the user from the user context
  const user = useContext(UserContext);

  // If there's an authenticated user, continue to child route
  if (user) {
    return children;
  }

  // Otherwise, send to login page
  return <Navigate to="/login" />;
}

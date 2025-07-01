import { Navigate } from 'react-router';
import { useAuth } from '../Context/Authcontext';

export default function PrivateRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" />;

  return children;
}
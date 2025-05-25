import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'doctor' | 'patient';
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // Aquí deberías implementar tu lógica real de autenticación
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 
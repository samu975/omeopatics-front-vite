import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string[];
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const location = useLocation();
  
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si hay token pero no hay rol, limpiar localStorage y redirigir al login
  if (!userRole) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el rol no está permitido para esta ruta
  if (!allowedRole.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 
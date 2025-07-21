import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    const role = localStorage.getItem('role');
    if (role === 'admin' || role === 'doctor') {
      navigate('/doctor/dashboard');
    } else if (role === 'patient') {
      navigate('/patient/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-3xl font-bold mb-4">Acceso Denegado</h2>
        <p className="text-lg text-gray-600 mb-8">
          No tienes permisos para acceder a esta página.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleGoBack}
            className="btn btn-primary"
          >
            Volver
          </button>
          
          <button 
            onClick={handleGoHome}
            className="btn btn-secondary"
          >
            Ir al Inicio
          </button>
          
          <button 
            onClick={handleLogout}
            className="btn btn-error"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 
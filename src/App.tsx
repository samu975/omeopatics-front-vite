import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DoctorRoutes } from './routes/DoctorRoutes'
import { PatientRoutes } from './routes/PatientRoutes'
import { PublicRoutes } from './routes/PublicRoutes'
import MainLayout from './layout/mainLayout'
import Unauthorized from './pages/Unauthorized'

// Componente para manejar la redirección inicial
const InitialRedirect = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  // Si hay token, redirigir según el rol
  switch (role) {
    case 'admin':
    case 'doctor':
      return <Navigate to="/doctor/dashboard" replace />
    case 'user':
      return <Navigate to="/patient/dashboard" replace />
    default:
      // Si el rol no es válido, limpiar localStorage y redirigir al login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      return <Navigate to="/login" replace />
  }
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Redirigir la ruta raíz según el estado de autenticación */}
          <Route path="/" element={<InitialRedirect />} />
          
        {/* Rutas públicas */}
        {PublicRoutes}
        
        {/* Ruta de no autorizado */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Rutas protegidas de doctor */}
        {DoctorRoutes}
        
        {/* Rutas protegidas de paciente */}
        {PatientRoutes}
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App

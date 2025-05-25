import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DoctorRoutes } from './routes/DoctorRoutes'
import { PatientRoutes } from './routes/PatientRoutes'
import { PublicRoutes } from './routes/PublicRoutes'
import MainLayout from './layout/mainLayout'
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Redirigir la ruta raíz al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
        {/* Rutas públicas */}
        {PublicRoutes}
        
        {/* Rutas protegidas de doctor */}
        {DoctorRoutes}
        
        {/* Rutas protegidas de paciente */}
        {PatientRoutes}
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App

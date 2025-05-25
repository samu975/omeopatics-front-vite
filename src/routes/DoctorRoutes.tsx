import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';

// Aquí deberás importar tus componentes reales
const DoctorDashboard = () => <div>Doctor Dashboard</div>;
const PatientList = () => <div>Patient List</div>;

export const DoctorRoutes = (
  <>
    <Route
      path="/doctor/dashboard"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <DoctorDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/patients"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <PatientList />
        </ProtectedRoute>
      }
    />
  </>
); 
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';
import PatientDashboard from '../pages/paciente/PatientDashboard';
import VerTest from '../pages/paciente/testControll/verTest';

// Aquí deberás importar tus componentes reales
const BookAppointment = () => <div>Book Appointment</div>;

export const PatientRoutes = (
  <>
    <Route
      path="/patient/dashboard"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <PatientDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/patient/formulas/ver"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <BookAppointment />
        </ProtectedRoute>
      }
    />
    <Route
      path="/patient/test/ver"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <VerTest />
        </ProtectedRoute>
      }
    />
  </>
); 
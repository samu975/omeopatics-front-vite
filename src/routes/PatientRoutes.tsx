import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';
import PatientDashboard from '../pages/paciente/PatientDashboard';
import VerTest from '../pages/paciente/testControll/VerTest';
import TestLenguajesAmor from '../pages/paciente/testControll/lenguajesDelAmor/TestLenguajesAmor';
import ResultadosTest from '../pages/paciente/testControll/lenguajesDelAmor/ResultadosTest';

// Aquí deberás importar tus componentes reales
const BookAppointment = () => <div>Book Appointment</div>;

export const PatientRoutes = (
  <>
    <Route
      path="/paciente/dashboard"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <PatientDashboard />
        </ProtectedRoute>
      }
    />
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
      path="/paciente/ver-test"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <VerTest />
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
    <Route
      path="/paciente/test-lenguajes-amor"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <TestLenguajesAmor />
        </ProtectedRoute>
      }
    />
    <Route
      path="/paciente/test-lenguajes-amor/resultados"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <ResultadosTest />
        </ProtectedRoute>
      }
    />
  </>
); 
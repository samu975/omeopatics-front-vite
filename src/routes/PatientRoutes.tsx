import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';
import PatientDashboard from '../pages/paciente/PatientDashboard';
import VerTest from '../pages/paciente/testControll/VerTest';
import TestLenguajesAmor from '../pages/paciente/testControll/lenguajesDelAmor/TestLenguajesAmor';
import ResultadosScreen from '../pages/paciente/testControll/lenguajesDelAmor/ResultadosPrevScreen';
import ResultadosAnalisis from '../pages/paciente/testControll/lenguajesDelAmor/ResultadosAnalisis';


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
          <ResultadosScreen />
        </ProtectedRoute>
      }
    />
    <Route
      path="/paciente/test-lenguajes-amor/resultados/analisis"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <ResultadosAnalisis />
        </ProtectedRoute>
      }
    />
    <Route
      path="/paciente/test-lenguajes-amor/resultados/analisis/resultados-comparacion"
      element={
        <ProtectedRoute allowedRole={['admin', 'patient']}>
          <ResultadosAnalisis />
        </ProtectedRoute>
      }
    />
  </>
); 
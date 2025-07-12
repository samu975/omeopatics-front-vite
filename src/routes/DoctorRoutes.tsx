import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import PatientList from '../pages/doctor/patientControll/PatientList';
import CreatePatient from '../pages/doctor/patientControll/CreatePatient';
import VerPaciente from '../pages/doctor/patientControll/VerPaciente';
import VerHistorial from '../pages/doctor/patientControll/historial/VerHistorial';
import CrearHistorial from '../pages/doctor/patientControll/historial/CrearHistorial';
import AgregarSesion from '../pages/doctor/patientControll/historial/sesionesTrabajadas/AgregarSesion';
import EditarSesion from '../pages/doctor/patientControll/historial/sesionesTrabajadas/EditarSesion';
import EditarHistorial from '../pages/doctor/patientControll/historial/EditarHistorial';

const BankQuestions = () => <div>Bank Questions</div>;

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
    {/* ver pacientes  */}
    <Route
      path="/doctor/patients"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <PatientList />
        </ProtectedRoute>
      }
    />
    {/* ver banco de preguntas  */}
    <Route
      path="/doctor/bank-questions"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <BankQuestions />
        </ProtectedRoute>
      }
    />
    {/* crear paciente  */}
    <Route
      path="/doctor/create-patient"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <CreatePatient />
        </ProtectedRoute>
      }
    />
    {/* ver paciente  */}
    <Route
      path="/doctor/patient/:patientId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <VerPaciente />
        </ProtectedRoute>
      }
    />
    {/* ver historial  */}
    <Route
      path="/doctor/historial/:patientId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <VerHistorial />
        </ProtectedRoute>
      }
    />
    {/* Crear historial  */}
    <Route
      path="/doctor/create-historial/:patientId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <CrearHistorial />
        </ProtectedRoute>
      }
    />
    {/* Agregar sesion */}
    <Route
      path="/doctor/historial/agregar-sesion/:historialId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <AgregarSesion />
        </ProtectedRoute>
      }
    />

{/* Editar sesiones realizadas  */}
    <Route
      path="/doctor/historial/:historialId/sesiones/:index"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <EditarSesion />
        </ProtectedRoute>
      }
    />

    {/* Editar campos de historial realizadas  */}
    <Route
      path="/doctor/historial/editar/:historialId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <EditarHistorial />
        </ProtectedRoute>
      }
    />
  </>
);

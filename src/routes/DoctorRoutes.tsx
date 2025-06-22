import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import PatientList from '../pages/doctor/patientControll/PatientList';
import CreatePatient from '../pages/doctor/patientControll/CreatePatient';
import VerPaciente from '../pages/doctor/patientControll/VerPaciente';
import VerHistorial from '../pages/doctor/patientControll/historial/VerHistorial';
import CrearHistorial from '../pages/doctor/patientControll/historial/CrearHistorial';
import AgregarSesion from '../pages/doctor/patientControll/historial/sesionesTrabajadas/AgregarSesion';

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
    <Route
      path="/doctor/patients"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <PatientList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/bank-questions"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <BankQuestions />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/create-patient"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <CreatePatient />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/patient/:patientId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <VerPaciente />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/historial/:patientId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <VerHistorial />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/create-historial/:patientId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <CrearHistorial />
        </ProtectedRoute>
      }
    />
    <Route
      path="/doctor/historial/agregar-sesion/:historialId"
      element={
        <ProtectedRoute allowedRole={['admin', 'doctor']}>
          <AgregarSesion />
        </ProtectedRoute>
      }
    />
  </>
); 
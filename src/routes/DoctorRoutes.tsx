import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import PatientList from '../pages/doctor/patientControll/PatientList';
import CreatePatient from '../pages/doctor/patientControll/CreatePatient';

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
  </>
); 
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';

const PatientList = () => <div>Patient List</div>;
const BankQuestions = () => <div>Bank Questions</div>;
const CreatePatient = () => <div>Create Patient</div>;

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
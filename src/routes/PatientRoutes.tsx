import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../middleware/authMiddleware';

// Aquí deberás importar tus componentes reales
const PatientDashboard = () => <div>Patient Dashboard</div>;
const BookAppointment = () => <div>Book Appointment</div>;
const MedicalHistory = () => <div>Medical History</div>;

export const PatientRoutes = (
  <>
    <Route
      path="/patient/dashboard"
      element={
        <ProtectedRoute allowedRole="patient">
          <PatientDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/patient/book-appointment"
      element={
        <ProtectedRoute allowedRole="patient">
          <BookAppointment />
        </ProtectedRoute>
      }
    />
    <Route
      path="/patient/medical-history"
      element={
        <ProtectedRoute allowedRole="patient">
          <MedicalHistory />
        </ProtectedRoute>
      }
    />
  </>
); 
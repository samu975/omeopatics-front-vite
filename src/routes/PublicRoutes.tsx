import { Route } from 'react-router-dom';
import Login from '../pages/auth/Login';


const Unauthorized = () => <div>No tienes autorización para ver esta página</div>;

export const PublicRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
  </>
); 
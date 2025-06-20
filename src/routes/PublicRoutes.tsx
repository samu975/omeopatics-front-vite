import { Route } from 'react-router-dom';
import Login from '../pages/auth/Login';

export const PublicRoutes = (
  <>
    <Route path="/login" element={<Login />} />
  </>
); 
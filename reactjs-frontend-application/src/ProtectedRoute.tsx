import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
interface ProtectedRouteProps {
  element: React.ReactElement;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
  const token = Cookies.get('accessToken');

  return token ? element : <Navigate to="/" />;
};

export default ProtectedRoute;

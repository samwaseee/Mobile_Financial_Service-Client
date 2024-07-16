import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const isAuthenticated = auth.token !== null && auth.user !== null;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const PrivateRoute = ({ children }) => {
  const { auth, isLoading } = useContext(AuthContext);
  const isAuthenticated = auth.token !== null && auth.user !== null;

  if (isLoading) {
    // Optionally, you can show a loading spinner or some message while authentication status is being resolved.
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

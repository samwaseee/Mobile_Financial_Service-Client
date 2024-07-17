import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const PublicRoute = ({ children }) => {
  const { auth, isLoading } = useContext(AuthContext);
  const isAuthenticated = auth.token !== null && auth.user !== null;

  if (isLoading) {
    // Optionally, you can show a loading spinner or some message while authentication status is being resolved.
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    const userRole = auth.user.role; // Assuming your token has a `role` field

    switch (userRole) {
      case 'user':
        return <Navigate to="/userHome" />;
      case 'agent':
        return <Navigate to="/agentHome" />;
      case 'admin':
        return <Navigate to="/adminHome" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};

export default PublicRoute;

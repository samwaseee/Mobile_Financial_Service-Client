import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem('auth'));
    if (savedAuth) {
      const { token } = savedAuth;
      const isTokenValid = validateToken(token);
      if (isTokenValid) {
        setAuth(savedAuth);
      } else {
        logout();
      }
    }
  }, []);

  const validateToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  const login = async (data) => {
    const response = await axiosInstance.post('/users/login', data);
    const { token } = response.data;
    const user = jwtDecode(token);
    const authData = { token, user };
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

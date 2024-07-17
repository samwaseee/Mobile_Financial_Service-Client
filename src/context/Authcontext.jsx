import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
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
      setIsLoading(false);
    };

    initializeAuth();
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

  const login = async (data, role) => {
    try {
      const endpoint = role === 'agent' ? '/agents/login' : role === 'admin' ? '/admins/login' : '/users/login';
      const response = await axiosInstance.post(endpoint, data);
      const { token } = response.data;
      const user = jwtDecode(token);
      const authData = { token, user };
      setAuth(authData);
      localStorage.setItem('auth', JSON.stringify(authData));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

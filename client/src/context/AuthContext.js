// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async (token) => {
    if (token) {
      try {
        const data = await getCurrentUser(token);
        setUser(data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
        setAuthToken(null);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser(authToken);
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

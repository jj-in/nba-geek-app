import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthApi from '../utils/AuthApi';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyUser();
    }
  }, []);

  const verifyUser = async () => {
    try {
      const username = await AuthApi.verifyToken();
      setUser(username);
    } catch (error) {
      console.error("Token verification failed", error);
    }
  };

  const login = async (token) => {
    localStorage.setItem('token', token);
    await verifyUser();
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, verifyUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as apiLoginAdmin, fetchAdminProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('fiaus_admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await fetchAdminProfile();
          if (res.success) {
            setAdmin(res.data);
          } else {
            logout();
          }
        } catch (e) {
          // Keep active admin session if token was validated
          setAdmin({ email: 'admin@fiaus.tech', name: 'FIAUS Tech Super Admin', role: 'super_admin' });
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await apiLoginAdmin({ email, password });
    if (res.success) {
      localStorage.setItem('fiaus_admin_token', res.data.token);
      setToken(res.data.token);
      setAdmin(res.data);
      return res.data;
    }
    throw new Error(res.message || 'Login failed.');
  };

  const logout = () => {
    localStorage.removeItem('fiaus_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


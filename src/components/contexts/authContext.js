import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const emitAuthChangeEvent = () => {
    window.dispatchEvent(new Event('authChange'));
  };
  
  // Function to listen to the authentication state change event
export const onAuthChange = (callback) => {
  window.addEventListener('authChange', callback);
};

export const useAuth = () => useContext(AuthContext);
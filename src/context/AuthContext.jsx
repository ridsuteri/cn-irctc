import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (user) => {
    console.log('user logging in', user);
    setLoggedInUser(user)
  };
  
  const logout = () => setLoggedInUser(null);

  return (
    <AuthContext.Provider value={{loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
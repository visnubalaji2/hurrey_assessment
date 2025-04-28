'use client';

import React, { createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setLoggedIn(true);
    }
  }, []); 

  function saveToken(token) {
    console.log('Saving token:', token);
    localStorage.setItem('token', token); 
    setToken(token);
    setLoggedIn(true);
  }

  return (
    <UserContext.Provider value={{ token, loggedIn, saveToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

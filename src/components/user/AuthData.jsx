"use client"

import { createContext, useContext, useState, useEffect } from "react";

const AuthData = createContext();

export const AuthDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
      const checkToken = async () => {
        const token = localStorage.getItem('token');
        try {
          if (token) {
            const response = await fetch('/api/user/me', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            if (response.ok) {
              const user = data.user || data;
              setUserData(user);
              setLoggedIn(true);
              if(user && user.role === 'admin'){
                setAdmin(true);
              } else {
                setAdmin(false);
              }
            } else {
              localStorage.removeItem('token');
              setAdmin(false);
              setLoggedIn(false);
              setUserData(null);
              console.log('Error checking token:', data.message);
            }
          } else {
            setLoggedIn(false);
            setAdmin(false);
            setUserData(null);
          }
        } catch (error) {
          console.error("Failed to check token:", error);
          setLoggedIn(false);
          setAdmin(false);
          setUserData(null);
        } finally {
          setLoading(false);
        }
      };
  
      checkToken();
    }, []);

    const login = (token, userDataFromLogin) => {
      localStorage.setItem("token", token);
      setUserData(userDataFromLogin || null);
      setLoggedIn(true);
      if (userDataFromLogin && userDataFromLogin.role === 'admin') {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      setUserData(null);
      setLoggedIn(false);
      setAdmin(false);
    };
    
    return (
      <AuthData.Provider value={{ userData, isLoggedIn, isLoading, logout, login, isAdmin }}>
        {children}
      </AuthData.Provider>
    );
}

export const useAuth = () => useContext(AuthData);
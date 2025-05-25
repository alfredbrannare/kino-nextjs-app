"use client"

import { createContext, useContext, useState, useEffect } from "react";

const AuthData = createContext();

export const AuthDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);
  const [isStudent, setStudent] = useState(false);
  const [isSenior, setSenior] = useState(false);

  const checkUser = async () => {
    try {
      const response = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        const user = data.user || data;
        setUserData(user);
        setLoggedIn(true);
        //Roles
        setAdmin(user?.role.includes('admin'));
        setStudent(user?.role.includes('student'));
        setSenior(user?.role.includes('senior'));


      } else {
        setAdmin(false);
        setStudent(false);
        setSenior(false);
        setLoggedIn(false);
        setUserData(null);
        console.log('Error checking token:', data.message);
      }
    } catch (error) {
      console.error("Failed to check token:", error);
      setLoggedIn(false);
      setAdmin(false);
      setStudent(false);
      setSenior(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = (userDataFromLogin) => {
    setUserData(userDataFromLogin || null);
    setLoggedIn(true);
    setAdmin(user?.role.includes('admin'));
    setStudent(user?.role.includes('student'));
    setSenior(user?.role.includes('senior'));
  };

  const logout = async () => {
    await fetch('/api/user/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUserData(null);
    setLoggedIn(false);
    setAdmin(false);
    setStudent(false);
    setSenior(false);
  };

  return (
    <AuthData.Provider value={{ userData, isLoggedIn, isLoading, logout, login, checkUser, isAdmin, isStudent, isSenior }}>
      {children}
    </AuthData.Provider>
  );
}

export const useAuth = () => useContext(AuthData);
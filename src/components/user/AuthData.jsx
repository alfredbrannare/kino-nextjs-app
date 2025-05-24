"use client"

import { createContext, useContext, useState, useEffect } from "react";

const AuthData = createContext();

export const AuthDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const localToken = localStorage.getItem('token');
      try {
        if (localToken) {
          setToken(localToken);
          const response = await fetch('/api/user/me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            const user = data.user || data;
            setUserData(user);
            setLoggedIn(true);
            if (user && user.role === 'admin') {
              setAdmin(true);
            } else {
              setAdmin(false);
            }
          } else {
            localStorage.removeItem('token');
            setToken('');
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
        setToken('');
        setLoggedIn(false);
        setAdmin(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = (apiToken, userDataFromLogin) => {
    localStorage.setItem("token", apiToken);
    setToken(apiToken);
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
    setToken('');
    setUserData(null);
    setLoggedIn(false);
    setAdmin(false);
  };

  const fetchUser = async () => {
  const localToken = localStorage.getItem("token");
  try {
    const response = await fetch("/api/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      const user = data.user || data;
      setUserData(user);
      setLoggedIn(true);
      setAdmin(user.role === "admin");
    } else {
      console.error("Failed to fetch user:", data.message);
    }
  } catch (err) {
    console.error("Fetch user error:", err);
  }
};

  return (
    <AuthData.Provider value={{ userData, isLoggedIn, isLoading, logout, login, isAdmin, token, fetchUser }}>
      {children}
    </AuthData.Provider>
  );
}

export const useAuth = () => useContext(AuthData);
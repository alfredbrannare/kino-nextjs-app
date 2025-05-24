"use client"

import { createContext, useContext, useState, useEffect } from "react";

const AuthData = createContext();

export const AuthDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
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
          //ADMIN
          setAdmin(user?.role === 'admin');

        } else {
          setAdmin(false);
          setLoggedIn(false);
          setUserData(null);
          console.log('Error checking token:', data.message);
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

    checkUser();
  }, []);

  const login = (userDataFromLogin) => {
    setUserData(userDataFromLogin || null);
    setLoggedIn(true);
    setAdmin(userDataFromLogin?.role === 'admin');
  };

  const logout = async () => {
    await fetch('/api/user/logout', {
      method: 'POST',
      credentials: 'include',
    });
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
    <AuthData.Provider value={{ userData, isLoggedIn, isLoading, logout, login, isAdmin, fetchUser }}>
      {children}
    </AuthData.Provider>
  );
}

export const useAuth = () => useContext(AuthData);
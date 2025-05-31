'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { UserType } from '@/ts/types';

interface AuthContextType {
  userData: UserType | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (userDataFromLogin: UserType | null) => void;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
}

const AuthData = createContext<AuthContextType | undefined>(undefined);

interface AuthDataProviderProps {
  children: ReactNode;
}

export const AuthDataProvider = ({ children }: AuthDataProviderProps) => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAdmin, setAdmin] = useState<boolean>(false);

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
        setAdmin(user?.role.includes('admin') ?? false);
      } else {
        setAdmin(false);
        setLoggedIn(false);
        setUserData(null);
        console.log('Error checking token:', data.message);
      }
    } catch (error) {
      console.error('Failed to check token:', error);
      setLoggedIn(false);
      setAdmin(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = (userDataFromLogin: UserType | null) => {
    setUserData(userDataFromLogin || null);
    setLoggedIn(true);
    setAdmin(userDataFromLogin?.role.includes('admin') ?? false);
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

  return (
    <AuthData.Provider
      value={{
        userData,
        isLoggedIn,
        isLoading,
        logout,
        login,
        checkUser,
        isAdmin,
      }}
    >
      {children}
    </AuthData.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthData);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthDataProvider');
  }
  return context;
};

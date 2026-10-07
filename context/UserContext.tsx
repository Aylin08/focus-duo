'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/user';

interface UserContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  login: (role: UserRole, name: string, email?: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('focus_duo_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error al recuperar la sesión:', e);
      }
    }
  }, []);

  const login = (role: UserRole, name: string, email?: string) => {
    const newUser: UserProfile = {
      id: Date.now().toString(),
      name,
      role,
      email,
    };
    setCurrentUser(newUser);
    localStorage.setItem('focus_duo_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('focus_duo_user');
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
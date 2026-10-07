'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/user';

interface Student {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
}

interface UserContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  updateUserProfile: (updatedData: Partial<UserProfile>) => void;
  login: (role: UserRole, name: string, email?: string) => void;
  logout: () => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student) => void;
  studentsList: Student[];
  canSelectStudent: boolean;
  canReceiveRealTimeAlerts: boolean;
  alerts: any[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Lista de alumnos de prueba por defecto
const DEFAULT_STUDENTS: Student[] = [
  { id: '1', name: 'Mateo López', grade: '3° A', avatar: '👦' },
  { id: '2', name: 'Sofia Ramírez', grade: '2° B', avatar: '👧' },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [studentsList] = useState<Student[]>(DEFAULT_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(DEFAULT_STUDENTS[0]);
  const [alerts] = useState<any[]>([]);

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

  // Función para actualizar datos del perfil local y en localStorage
  const updateUserProfile = (updatedData: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    localStorage.setItem('focus_duo_user', JSON.stringify(updated));
  };

  // Permisos según el rol
  const role = currentUser?.role?.toLowerCase();
  const canSelectStudent = role === 'docente' || role === 'terapeuta' || role === 'familia';
  const canReceiveRealTimeAlerts = role === 'docente' || role === 'terapeuta';

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateUserProfile,
        login,
        logout,
        selectedStudent,
        setSelectedStudent,
        studentsList,
        canSelectStudent,
        canReceiveRealTimeAlerts,
        alerts,
      }}
    >
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
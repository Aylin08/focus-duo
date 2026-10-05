'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, UserProfile, Student, SensorialAlert } from '@/types/user';

// Alumnos de prueba iniciales
const INITIAL_STUDENTS: Student[] = [
  { id: 's1', name: 'Santi Morales', grade: '2° Primaria', supportLevel: 'medio', avatar: '👦' },
  { id: 's2', name: 'Sofía Castro', grade: '1° Primaria', supportLevel: 'alto', avatar: '👧' },
];

interface UserContextType {
  currentUser: UserProfile;
  selectedStudent: Student | null;
  studentsList: Student[];
  alerts: SensorialAlert[];
  setCurrentUser: (user: UserProfile) => void;
  setSelectedStudent: (student: Student) => void;
  addAlert: (alert: Omit<SensorialAlert, 'id' | 'timestamp' | 'read'>) => void;
  markAlertAsRead: (alertId: string) => void;
  // Banderas de permisos según rol
  canSelectStudent: boolean;
  canEditEducationLevel: boolean;
  canManageHomeRoutines: boolean;
  canUseSchoolFamilyChat: boolean;
  canAccessTeacherCalmSpace: boolean;
  canReceiveRealTimeAlerts: boolean;
  canAssignRefinementTasks: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'Maestra Sofía',
    role: 'docente',
  });

  const [studentsList] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student>(INITIAL_STUDENTS[0]);
  const [alerts, setAlerts] = useState<SensorialAlert[]>([]);

  // Reglas de permisos por Rol
  const isStudent = currentUser.role === 'estudiante';
  const isTeacher = currentUser.role === 'docente';
  const isTherapist = currentUser.role === 'terapeuta';
  const isFamily = currentUser.role === 'familia';

  const canSelectStudent = !isStudent; // Docente, Terapeuta y Familia pueden seleccionar alumno/hijo
  const canEditEducationLevel = isTeacher; // Solo el Docente gestiona el nivel educativo
  const canManageHomeRoutines = isFamily; // Solo la Familia gestiona rutinas de hogar
  const canUseSchoolFamilyChat = isTeacher || isFamily; // Comunicación Escuela-Familia
  const canAccessTeacherCalmSpace = isTeacher; // Módulo propio del docente
  const canReceiveRealTimeAlerts = isTeacher || isTherapist; // Notificaciones en tiempo real
  const canAssignRefinementTasks = isTeacher || isTherapist || isFamily; // Asignan excepto el estudiante

  const addAlert = (newAlert: Omit<SensorialAlert, 'id' | 'timestamp' | 'read'>) => {
    const alertItem: SensorialAlert = {
      ...newAlert,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setAlerts((prev) => [alertItem, ...prev]);
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, read: true } : a))
    );
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        selectedStudent,
        studentsList,
        alerts,
        setCurrentUser,
        setSelectedStudent,
        addAlert,
        markAlertAsRead,
        canSelectStudent,
        canEditEducationLevel,
        canManageHomeRoutines,
        canUseSchoolFamilyChat,
        canAccessTeacherCalmSpace,
        canReceiveRealTimeAlerts,
        canAssignRefinementTasks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};
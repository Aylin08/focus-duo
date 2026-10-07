// components/AppModals.tsx
import React from 'react';
import { SessionReportModal } from './SessionReportModal';
import { LoginModal } from './LoginModal';
import { StudentManagerModal } from './StudentManagerModal';
import ProfileModal from '@/components/ProfileModal';
import { Student, UserProfile, UserRole } from '../types/user';

interface AppModalsProps {
  isReportOpen: boolean;
  setIsReportOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  isStudentModalOpen: boolean;
  setIsStudentModalOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  currentGradeInfo: any;
  selectedGrade: string;
  isHighContrast: boolean;
  user: UserProfile | null;
  activeStudent: Student | null;
  handleSelectRole: (profile: UserProfile) => void;
  handleSelectStudent: (student: Student) => void;
}

export const AppModals: React.FC<AppModalsProps> = ({
  isReportOpen,
  setIsReportOpen,
  isLoginOpen,
  isStudentModalOpen,
  setIsStudentModalOpen,
  isProfileOpen,
  setIsProfileOpen,
  currentGradeInfo,
  selectedGrade,
  isHighContrast,
  user,
  activeStudent,
  handleSelectRole,
  handleSelectStudent,
}) => {
  return (
    <>
      <SessionReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        gradeTitle={currentGradeInfo?.label || selectedGrade}
        isHighContrast={isHighContrast}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onSelectRole={handleSelectRole}
        isHighContrast={isHighContrast}
      />

      <StudentManagerModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        userRole={(user?.role as UserRole) || 'docente'}
        selectedStudentId={activeStudent?.id || null}
        onSelectStudent={handleSelectStudent}
        isHighContrast={isHighContrast}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={user}
      />
    </>
  );
};
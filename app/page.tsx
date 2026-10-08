'use client';

import React, { useState, useEffect } from 'react';
import { GRADE_DATA } from '../data/gradesData';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { AccessibilityToolbar } from '../components/AccessibilityToolbar';
import { HomeModule } from '../components/HomeModule';
import { ReinforcementModule } from '../components/ReinforcementModule';
import { SchoolFamilyChannel } from '@/components/SchoolFamilyChannel';
import { AppSection, Student, UserProfile, UserRole } from '../types/user';
import { supabase } from '../lib/supabaseClient';

// Componentes Modularizados
import { UserActionBar } from '../components/UserActionBar';
import { AulaSection } from '../components/AulaSection';
import { AppModals } from '../components/AppModals';

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState('1er-grado');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [activeSection, setActiveSection] = useState<AppSection>('aula');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Protección: Si el rol es estudiante y está en 'comunicacion', redirigir a 'aula'
  useEffect(() => {
    if (user?.role === 'estudiante' && activeSection === 'comunicacion') {
      setActiveSection('aula');
    }
  }, [user, activeSection]);

  // Sincronizar el grado automáticamente según el perfil del usuario o alumno activo
  useEffect(() => {
    if (user?.role === 'estudiante' && user.grade) {
      setSelectedGrade(user.grade);
    } else if (activeStudent?.grade) {
      setSelectedGrade(activeStudent.grade);
    }
  }, [user, activeStudent]);

  useEffect(() => {
    const savedGrade = localStorage.getItem('aula_selectedGrade');
    if (savedGrade && (GRADE_DATA as Record<string, any>)[savedGrade] && user?.role !== 'estudiante') {
      setSelectedGrade(savedGrade);
    }

    const loadSupabaseSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: profile.role as UserRole,
            avatar: profile.avatar,
            grade: profile.grade,
          });
          setIsLoginOpen(false);
          return;
        }
      }
      setIsLoginOpen(true);
    };

    loadSupabaseSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        setIsLoginOpen(true);
      }
    });

    const savedStudent = localStorage.getItem('aula_activeStudent');
    if (savedStudent) {
      try {
        setActiveStudent(JSON.parse(savedStudent));
      } catch (e) {
        console.error('Error al cargar estudiante activo:', e);
      }
    }

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setActiveStudent(null);
    localStorage.removeItem('aula_activeStudent');
    setIsLoginOpen(true);
  };

  const currentGradeInfo: any = (GRADE_DATA as Record<string, any>)[selectedGrade] || {};

  return (
    <main
      className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${
        isHighContrast ? 'high-contrast bg-slate-950 text-white' : 'bg-[#f7f5f0] text-stone-800'
      } ${isDyslexic ? 'dyslexia-font' : 'font-sans'} ${reduceMotion ? 'reduce-motion' : ''}`}
    >
      <Header />

      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
        onChangeUser={() => setIsLoginOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        isHighContrast={isHighContrast}
      />

      {user && (
        <UserActionBar
          user={user}
          activeStudent={activeStudent}
          onOpenStudentModal={() => setIsStudentModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      <div className="max-w-4xl mx-auto my-4">
        <AccessibilityToolbar
          isDyslexic={isDyslexic}
          setIsDyslexic={setIsDyslexic}
          isHighContrast={isHighContrast}
          setIsHighContrast={setIsHighContrast}
          isReducedMotion={reduceMotion}
          setIsReducedMotion={setReduceMotion}
          onOpenReport={() => setIsReportOpen(true)}
        />
      </div>

      {activeSection === 'aula' && (
        <AulaSection
          selectedGrade={selectedGrade}
          onSelectGrade={(gradeKey) => {
            setSelectedGrade(gradeKey);
            localStorage.setItem('aula_selectedGrade', gradeKey);
          }}
          currentGradeInfo={currentGradeInfo}
          activeStudent={activeStudent}
          isHighContrast={isHighContrast}
          onToggleTask={(id) => console.log('Tarea:', id)}
          userRole={user?.role} // 👈 Pasa el rol para controlar la vista del selector
        />
      )}

      {activeSection === 'hogar' && <HomeModule isHighContrast={isHighContrast} />}
      {activeSection === 'refuerzo' && <ReinforcementModule isHighContrast={isHighContrast} />}
      
      {/* Solo renderiza la sección si NO es estudiante */}
      {activeSection === 'comunicacion' && user?.role !== 'estudiante' && (
        <SchoolFamilyChannel isHighContrast={isHighContrast} />
      )}

      <AppModals
        isReportOpen={isReportOpen}
        setIsReportOpen={setIsReportOpen}
        isLoginOpen={isLoginOpen}
        isStudentModalOpen={isStudentModalOpen}
        setIsStudentModalOpen={setIsStudentModalOpen}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        currentGradeInfo={currentGradeInfo}
        selectedGrade={selectedGrade}
        isHighContrast={isHighContrast}
        user={user}
        activeStudent={activeStudent}
        handleSelectRole={(profile) => {
          setUser(profile);
          setIsLoginOpen(false);
          if (['docente', 'terapeuta', 'familia'].includes(profile.role)) {
            setIsStudentModalOpen(true);
          }
        }}
        handleSelectStudent={(student) => {
          setActiveStudent(student);
          localStorage.setItem('aula_activeStudent', JSON.stringify(student));
        }}
        onUpdateUser={(updatedUser) => setUser(updatedUser)}
      />
    </main>
  );
}
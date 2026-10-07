'use client';

import React, { useState, useEffect } from 'react';
import { GRADE_DATA } from '../data/gradesData';
import { Header } from '../components/Header';
import { AccessibilityToolbar } from '../components/AccessibilityToolbar';
import { GradeSelector } from '../components/GradeSelector';
import { GradeInfoCard } from '../components/GradeInfoCard';
import { HealthTracker } from '../components/HealthTracker';
import { SensoryTrafficLight } from '../components/SensoryTrafficLight';
import { VisualSupports } from '../components/VisualSupports';
import { TaskList } from '../components/TaskList';
import { SensorTimer } from '../components/SensorTimer';
import { SensoryCalmModule } from '@/components/SensoryCalmModule';
import { SessionReportModal } from '../components/SessionReportModal';
import { HomeModule } from '../components/HomeModule';
import { Navbar } from '../components/Navbar';
import { LoginModal } from '../components/LoginModal';
import { StudentManagerModal } from '../components/StudentManagerModal';
import { AppSection, Student, UserProfile, UserRole } from '../types/user';
import { ReinforcementModule } from '../components/ReinforcementModule';
import { SchoolFamilyChannel } from '@/components/SchoolFamilyChannel';
import { supabase } from '../lib/supabaseClient';
import { User, LogOut } from 'lucide-react';
import ProfileModal from '@/components/ProfileModal';

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState('1er-grado');
  
  // Estado para Modales
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Estado del Estudiante / Hijo Activo
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  // Estados de Accesibilidad
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Estados para Módulos y Usuario
  const [activeSection, setActiveSection] = useState<AppSection>('aula');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    // 1. Cargar Grado guardado
    const savedGrade = localStorage.getItem('aula_selectedGrade');
    if (savedGrade && (GRADE_DATA as Record<string, any>)[savedGrade]) {
      setSelectedGrade(savedGrade);
    }

    // 2. Cargar Usuario desde la Sesión Activa de Supabase
    const loadSupabaseSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Consultar el perfil guardado en la tabla 'profiles'
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const userProfile: UserProfile = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: profile.role as UserRole,
            avatar: profile.avatar,
            grade: profile.grade,
          };
          setUser(userProfile);
          setIsLoginOpen(false);
          return;
        }
      }

      // Si no hay sesión válida en Supabase, abre el modal de Login
      setIsLoginOpen(true);
    };

    loadSupabaseSession();

    // 3. Escuchar cambios de autenticación en tiempo real
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        setIsLoginOpen(true);
      }
    });

    // 4. Cargar Estudiante guardado
    const savedStudent = localStorage.getItem('aula_activeStudent');
    if (savedStudent) {
      try {
        setActiveStudent(JSON.parse(savedStudent));
      } catch (e) {
        console.error('Error al cargar estudiante activo:', e);
      }
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSelectGrade = (gradeKey: string) => {
    setSelectedGrade(gradeKey);
    localStorage.setItem('aula_selectedGrade', gradeKey);
  };

  const handleToggleTask = (taskId: string | number) => {
    console.log('Tarea conmutada:', taskId);
  };

  const handleSelectRole = (userProfile: UserProfile) => {
    setUser(userProfile);
    setIsLoginOpen(false);

    // Abrir la selección de alumno si el perfil es docente, terapeuta o familia
    if (userProfile.role === 'docente' || userProfile.role === 'terapeuta' || userProfile.role === 'familia') {
      setIsStudentModalOpen(true);
    }
  };

  const handleSelectStudent = (student: Student) => {
    setActiveStudent(student);
    localStorage.setItem('aula_activeStudent', JSON.stringify(student));
  };

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
        isHighContrast 
          ? 'high-contrast bg-slate-950 text-white' 
          : 'bg-[#f7f5f0] text-stone-800'
      } ${isDyslexic ? 'dyslexia-font' : 'font-sans'} ${reduceMotion ? 'reduce-motion' : ''}`}
    >
      {/* Encabezado Principal */}
      <Header />

      {/* Navegación por Módulos (Aula, Hogar, Refuerzo, Comunicación) */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
        onChangeUser={() => setIsLoginOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        isHighContrast={isHighContrast}
      />

      {/* Barra de Selección Rápida de Alumno / Hijo Activo y Cerrar Sesión */}
      {user && user.role !== 'estudiante' && (
        <div className="max-w-4xl mx-auto my-3 flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs text-stone-500 dark:text-slate-400">
              {user.role === 'familia' ? 'Hijo/a en seguimiento:' : 'Alumno/a en sesión:'}
            </span>
            <span className="text-xs font-bold text-stone-800 dark:text-white">
              {activeStudent ? activeStudent.name : 'Ninguno seleccionado'}
            </span>
            <button
              onClick={() => setIsStudentModalOpen(true)}
              className="ml-2 px-3 py-1 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 rounded-xl transition cursor-pointer"
            >
              {activeStudent ? 'Cambiar' : 'Seleccionar'}
            </button>
          </div>

          {/* Botón para Cerrar Sesión en Supabase */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      )}

      {/* Barra de Accesibilidad */}
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

      {/* VISTA 1: Módulo de Aula & Terapia */}
      {activeSection === 'aula' && (
        <>
          <GradeSelector
            selectedGrade={selectedGrade}
            onSelectGrade={handleSelectGrade}
          />

          <div className="max-w-4xl mx-auto space-y-5 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              <GradeInfoCard
                gradeInfo={currentGradeInfo}
                studentStatus={
                  activeStudent 
                    ? `Sesión activa con ${activeStudent.name} 📚` 
                    : 'En jornada escolar 📚'
                }
              />
              <HealthTracker isHighContrast={isHighContrast} />
              <SensoryTrafficLight isHighContrast={isHighContrast} />
              <SensorTimer isHighContrast={isHighContrast} />

              <TaskList 
                gradeTitle={currentGradeInfo?.label || selectedGrade} 
                tasks={currentGradeInfo?.tasks || currentGradeInfo?.rutina}
                onToggleTask={handleToggleTask}
                isHighContrast={isHighContrast}
              />

              <SensoryCalmModule isHighContrast={isHighContrast} />
            </div>

            <div className="w-full">
              <VisualSupports isHighContrast={isHighContrast} />
            </div>
          </div>
        </>
      )}

      {/* VISTA 2: Módulo de Hogar & Vida Diaria */}
      {activeSection === 'hogar' && (
        <HomeModule isHighContrast={isHighContrast} />
      )}

      {/* VISTA 3: Rincón de Refuerzo & Habilidades */}
      {activeSection === 'refuerzo' && (
        <ReinforcementModule isHighContrast={isHighContrast} />
      )}

      {/* VISTA 4: Comunicación Escuela-Familia */}
      {activeSection === 'comunicacion' && (
        <SchoolFamilyChannel isHighContrast={isHighContrast} />
      )}

      {/* Modal de Resumen de Jornada */}
      <SessionReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        gradeTitle={currentGradeInfo?.label || selectedGrade}
        isHighContrast={isHighContrast}
      />

      {/* Modal de Inicio de Sesión / Selección de Perfil */}
      <LoginModal
        isOpen={isLoginOpen}
        onSelectRole={handleSelectRole}
        isHighContrast={isHighContrast}
      />

      {/* Modal de Gestión de Estudiantes / Hijos */}
      <StudentManagerModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        userRole={user?.role || 'docente'}
        selectedStudentId={activeStudent?.id || null}
        onSelectStudent={handleSelectStudent}
        isHighContrast={isHighContrast}
      />

      {/* Modal de Configuración de Perfil */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={user}
      />
    </main>
  );
}
'use client';

import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types/user';
import { 
  ShieldCheck, 
  HeartHandshake, 
  GraduationCap, 
  Sparkles, 
  UserPlus, 
  LogIn, 
  Mail, 
  Lock, 
  UserCheck, 
  User, 
  Eye, 
  EyeOff,
  CheckCircle2
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onSelectRole: (user: UserProfile) => void;
  isHighContrast?: boolean;
}

const ROLES: { id: UserRole; title: string; description: string; icon: React.ReactNode; color: string }[] = [
  {
    id: 'docente',
    title: 'Docente / Educación',
    description: 'Acceso a gestión de aula, adaptaciones visuales y rutinas de grado.',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-emerald-500 text-white',
  },
  {
    id: 'terapeuta',
    title: 'Terapeuta / Especialista',
    description: 'Seguimiento de autorregulación, pausas sensoriales y reportes.',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-indigo-500 text-white',
  },
  {
    id: 'familia',
    title: 'Familia / Tutor',
    description: 'Acompañamiento en el hogar, canal de comunicación y hábitos.',
    icon: <HeartHandshake className="w-6 h-6" />,
    color: 'bg-amber-500 text-white',
  },
  {
    id: 'estudiante',
    title: 'Estudiante',
    description: 'Modo visual simplificado con apoyos, pictogramas y temporizadores.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'bg-sky-500 text-white',
  },
];

interface RegisteredAccount extends UserProfile {
  password?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onSelectRole, isHighContrast }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('docente');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibilidad de contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Mensajes de estado (error o éxito)
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Obtener cuentas guardadas en localStorage
    const existingUsersRaw = localStorage.getItem('aula_registeredUsers');
    const registeredUsers: RegisteredAccount[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

    if (mode === 'register') {
      // Validaciones de Registro
      if (!name.trim()) {
        setError('Por favor ingresa tu nombre completo.');
        return;
      }
      if (!email.trim()) {
        setError('Por favor ingresa un correo o nombre de usuario.');
        return;
      }
      if (!password || password.length < 4) {
        setError('La contraseña debe tener al menos 4 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden. Por favor verifícalas.');
        return;
      }

      // Validar si ya existe la cuenta
      const userExists = registeredUsers.some(
        (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
      );

      if (userExists) {
        setError('Este correo o usuario ya está registrado. Por favor inicia sesión.');
        return;
      }

      // Crear nuevo usuario
      const newUser: RegisteredAccount = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: selectedRole,
        password: password,
      };

      registeredUsers.push(newUser);
      localStorage.setItem('aula_registeredUsers', JSON.stringify(registeredUsers));

      const { password: _, ...userProfile } = newUser;

      // Notificación de Éxito al Crear Usuario
      setSuccessMessage('¡Usuario registrado exitosamente! Iniciando sesión...');
      
      setTimeout(() => {
        onSelectRole(userProfile);
      }, 1200);

    } else {
      // Validaciones de Iniciar Sesión
      if (!email.trim() || !password) {
        setError('Por favor ingresa tu correo/usuario y tu contraseña.');
        return;
      }

      const matchedUser = registeredUsers.find(
        (u) =>
          u.email?.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!matchedUser) {
        setError('Usuario o contraseña incorrectos. Si no tienes cuenta, regístrate.');
        return;
      }

      const { password: _, ...userProfile } = matchedUser;

      // Notificación de Datos Correctos al Ingresar
      setSuccessMessage('¡Datos correctos! Ingresando a la plataforma...');
      
      setTimeout(() => {
        onSelectRole(userProfile);
      }, 1000);
    }
  };

  const handleSwitchTab = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl transition-all border max-h-[90vh] overflow-y-auto ${
          isHighContrast
            ? 'bg-slate-900 text-white border-amber-400'
            : 'bg-white text-stone-800 border-stone-200'
        }`}
      >
        {/* Encabezado */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mb-2 shadow-inner">
            {mode === 'login' ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
            Plataforma Adaptativa de Acompañamiento Inclusivo
          </p>

          {/* Selector de Pestañas */}
          <div className="flex p-1 mt-4 rounded-2xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => handleSwitchTab('login')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Ingresar
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('register')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Registrarse
            </button>
          </div>
        </div>

        {/* Notificación de Éxito */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl text-xs font-bold bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl text-xs font-semibold bg-red-100 border border-red-300 text-red-700 dark:bg-red-950/60 dark:border-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre completo (Registro) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
                Nombre Completo:
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. María López"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    isHighContrast
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-stone-50 border-stone-300 text-stone-800 placeholder-stone-400'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Correo o Usuario */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
              Correo Electrónico o Usuario:
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  isHighContrast
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-stone-50 border-stone-300 text-stone-800 placeholder-stone-400'
                }`}
              />
            </div>
          </div>

          {/* Contraseña con Ojo */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
              Contraseña:
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  isHighContrast
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-stone-50 border-stone-300 text-stone-800 placeholder-stone-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-white transition cursor-pointer"
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Repetir Contraseña (Solo Registro) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
                Repetir Contraseña:
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    isHighContrast
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-stone-50 border-stone-300 text-stone-800 placeholder-stone-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-white transition cursor-pointer"
                  title={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Selección de Rol (Solo Registro) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-75">
                Selecciona tu Rol:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ROLES.map((r) => {
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                        isSelected
                          ? isHighContrast
                            ? 'border-amber-400 bg-slate-800 text-white ring-2 ring-amber-400'
                            : 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-stone-800 dark:text-white ring-2 ring-indigo-500'
                          : isHighContrast
                          ? 'border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${r.color}`}>
                        {r.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">{r.title}</div>
                        <div className="text-[10px] opacity-70 line-clamp-1">{r.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={!!successMessage}
            className="w-full mt-2 py-3 px-4 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
          >
            <UserCheck className="w-5 h-5" />
            {mode === 'login' ? 'Ingresar a la Plataforma' : 'Crear Cuenta e Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};
'use client';

import React, { useState } from 'react';
import { UserProfile } from './../types/user';
import { AuthForm } from './auth/AuthForm';
import { LogIn, UserPlus, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onSelectRole: (user: UserProfile) => void;
  isHighContrast?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onSelectRole, isHighContrast }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

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

        {/* Notificaciones */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl text-xs font-bold bg-emerald-100 border border-emerald-300 text-emerald-800 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl text-xs font-semibold bg-red-100 border border-red-300 text-red-700 dark:bg-red-950/60 dark:border-red-800 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Formulario Modular */}
        <AuthForm
          mode={mode}
          isHighContrast={isHighContrast}
          onSuccess={onSelectRole}
          onError={setError}
          onSuccessMsg={setSuccessMessage}
        />
      </div>
    </div>
  );
};
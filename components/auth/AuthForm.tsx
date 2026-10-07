'use client';

import React, { useState } from 'react';
import { UserRole, UserProfile } from '../../types/user';
import { supabase } from '../../lib/supabaseClient';
import { RoleSelector } from './RoleSelector';
import { Mail, Lock, User, Eye, EyeOff, UserCheck, Loader2 } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'register';
  isHighContrast?: boolean;
  onSuccess: (user: UserProfile) => void;
  onError: (msg: string) => void;
  onSuccessMsg: (msg: string) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  isHighContrast,
  onSuccess,
  onError,
  onSuccessMsg,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('docente');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError('');
    onSuccessMsg('');

    if (mode === 'register') {
      if (!name.trim()) return onError('Por favor ingresa tu nombre completo.');
      if (!email.trim()) return onError('Por favor ingresa tu correo electrónico.');
      if (!password || password.length < 6) return onError('La contraseña debe tener al menos 6 caracteres.');
      if (password !== confirmPassword) return onError('Las contraseñas no coinciden. Por favor verifícalas.');

      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (authError) {
        setLoading(false);
        return onError(authError.message || 'Error al registrar el usuario.');
      }

      if (authData.user) {
        const userProfile: UserProfile = {
          id: authData.user.id,
          name: name.trim(),
          email: email.trim(),
          role: selectedRole,
        };

        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: authData.user.id,
            name: userProfile.name,
            email: userProfile.email,
            role: userProfile.role,
          },
        ]);

        if (profileError) console.error('Error al guardar el perfil:', profileError);

        onSuccessMsg('¡Usuario registrado exitosamente en Supabase! Iniciando sesión...');
        setLoading(false);
        setTimeout(() => onSuccess(userProfile), 1200);
      }
    } else {
      if (!email.trim() || !password) return onError('Por favor ingresa tu correo y contraseña.');

      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setLoading(false);
        return onError('Correo o contraseña incorrectos. Verifica tus datos o regístrate.');
      }

      if (authData.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        const loggedUser: UserProfile = {
          id: authData.user.id,
          name: profileData?.name || authData.user.email?.split('@')[0] || 'Usuario',
          email: authData.user.email,
          role: profileData?.role || 'docente',
          avatar: profileData?.avatar,
          grade: profileData?.grade,
        };

        onSuccessMsg('¡Datos correctos! Ingresando a la plataforma...');
        setLoading(false);
        setTimeout(() => onSuccess(loggedUser), 1000);
      }
    }
  };

  const inputStyle = `w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
    isHighContrast
      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
      : 'bg-stone-50 border-stone-300 text-stone-800 placeholder-stone-400'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
              className={inputStyle}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
          Correo Electrónico:
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className={inputStyle}
          />
        </div>
      </div>

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
            className={`${inputStyle} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-white transition cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mode === 'register' && (
        <>
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
                className={`${inputStyle} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-white transition cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <RoleSelector
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
            isHighContrast={isHighContrast}
          />
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3 px-4 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <UserCheck className="w-5 h-5" />
            {mode === 'login' ? 'Ingresar a la Plataforma' : 'Crear Cuenta e Ingresar'}
          </>
        )}
      </button>
    </form>
  );
};
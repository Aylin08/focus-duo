'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types/user';
import { supabase } from '../lib/supabaseClient';
import { User, Camera, Check, Loader2, X, Shield } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUpdateUser: (updatedUser: UserProfile) => void;
  isHighContrast?: boolean;
}

// Opciones de avatares predeterminados en SVG para selección rápida
const DEFAULT_AVATARS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=Felix',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Luna',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Oliver',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Milo',
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  isHighContrast = false,
}) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(DEFAULT_AVATARS[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sincronizar el estado con el usuario actual cada vez que se abre el modal
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAvatar(user.avatar || DEFAULT_AVATARS[0]);
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'El nombre no puede estar vacío.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // 1. Actualizar en Supabase (tabla public.profiles)
      const { error } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          avatar: avatar,
        })
        .eq('id', user.id);

      if (error) throw error;

      // 2. Actualizar estado global en React
      const updatedUser: UserProfile = {
        ...user,
        name: name.trim(),
        avatar: avatar,
      };

      onUpdateUser(updatedUser);
      setMessage({ type: 'success', text: '¡Perfil actualizado correctamente!' });

      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error('Error al actualizar perfil:', err);
      setMessage({ type: 'error', text: 'Error al guardar los cambios en la base de datos.' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-md rounded-3xl p-6 shadow-2xl transition-all border ${
          isHighContrast
            ? 'bg-slate-900 text-white border-amber-400'
            : 'bg-white text-stone-800 border-stone-200'
        }`}
      >
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600 dark:text-amber-400" />
            <h2 className="text-xl font-bold">Configuración de Perfil</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensajes de alerta */}
        {message && (
          <div
            className={`p-3 rounded-xl text-xs font-bold mb-4 flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.type === 'success' && <Check className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          {/* Sección Avatar / Foto */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <img
                src={avatar}
                alt="Foto de Perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-indigo-700 transition"
                title="Subir foto desde tu dispositivo"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Selección rápida de avatares */}
            <div className="flex gap-2 mt-1">
              {DEFAULT_AVATARS.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setAvatar(item)}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition cursor-pointer ${
                    avatar === item
                      ? 'border-indigo-600 scale-110'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item} alt={`Avatar ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Nombre de usuario */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                isHighContrast
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-stone-50 border-stone-300 text-stone-800'
              }`}
            />
          </div>

          {/* Rol del usuario */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
              Rol Asignado:
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs font-bold capitalize text-stone-600 dark:text-slate-300">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>{user.role}</span>
            </div>
          </div>

          {/* Botón Guardar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Check className="w-5 h-5" />
                Guardar Cambios
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
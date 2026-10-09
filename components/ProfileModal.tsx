'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types/user';
import { supabase } from '../lib/supabaseClient';
import { User, Check, Loader2, X } from 'lucide-react';
import { AvatarSelector } from '../components/profile/AvatarSelector';
import { ProfileFormFields } from '../components/profile/ProfileFormFields';
import { ProfileAlert } from '../components/profile/ProfileAlert';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUpdateUser?: (updatedUser: UserProfile) => void;
  isHighContrast?: boolean;
}

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
      const { error } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          avatar: avatar,
        })
        .eq('id', user.id);

      if (error) throw error;

      const updatedUser: UserProfile = {
        ...user,
        name: name.trim(),
        avatar: avatar,
      };

      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }
      
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

        {/* Alertas */}
        <ProfileAlert message={message} />

        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar y Fotos */}
          <AvatarSelector
            avatar={avatar}
            defaultAvatars={DEFAULT_AVATARS}
            onSelectAvatar={setAvatar}
            onImageUpload={handleImageUpload}
          />

          {/* Campos de Texto y Rol */}
          <ProfileFormFields
            name={name}
            role={user.role}
            isHighContrast={isHighContrast}
            onNameChange={setName}
          />

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
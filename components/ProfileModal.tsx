'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: any;
}

export default function ProfileModal({ isOpen, onClose, userProfile }: ProfileModalProps) {
  const { updateUserProfile, currentUser } = useUser();
  const activeUser = userProfile || currentUser;

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (activeUser) {
      setName(activeUser.name || '');
      setAvatarUrl(activeUser.avatar_url || '');
    }
  }, [activeUser, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (updateUserProfile) {
        updateUserProfile({ name, avatar_url: avatarUrl } as any);
      }
      setMessage({ type: 'success', text: '¡Perfil actualizado con éxito!' });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1000);
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Error al actualizar perfil' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl relative border border-stone-200 dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-white font-bold text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-black text-stone-900 dark:text-white mb-4">
          Configuración de Perfil
        </h2>

        {message && (
          <div className={`p-3 rounded-2xl text-xs font-bold mb-4 ${
            message.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-black border-2 border-amber-400 overflow-hidden shadow-inner">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                name.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <p className="text-xs font-bold text-stone-500 capitalize">
              Rol: <span className="text-indigo-600 dark:text-indigo-400">{activeUser?.role || 'Docente'}</span>
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-stone-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
              URL Foto de Perfil (Opcional)
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://ejemplo.com/foto.jpg"
              className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-stone-900 dark:text-white"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-300 rounded-2xl text-xs font-bold hover:bg-stone-50 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
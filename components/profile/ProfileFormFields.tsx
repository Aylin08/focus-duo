'use client';

import React from 'react';
import { Shield } from 'lucide-react';

interface ProfileFormFieldsProps {
  name: string;
  role: string;
  isHighContrast: boolean;
  onNameChange: (value: string) => void;
}

export const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
  name,
  role,
  isHighContrast,
  onNameChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Nombre de usuario */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-75">
          Nombre de Usuario:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
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
          <span>{role}</span>
        </div>
      </div>
    </div>
  );
};
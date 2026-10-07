'use client';

import React from 'react';
import { UserRole } from '../../types/user';
import { ROLES } from './constants';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  isHighContrast?: boolean;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onSelectRole,
  isHighContrast,
}) => {
  return (
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
              onClick={() => onSelectRole(r.id)}
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
              <div className={`p-2 rounded-xl shrink-0 ${r.color}`}>{r.icon}</div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">{r.title}</div>
                <div className="text-[10px] opacity-70 line-clamp-1">{r.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
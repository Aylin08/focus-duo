'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ProfileAlertProps {
  message: { type: 'success' | 'error'; text: string } | null;
}

export const ProfileAlert: React.FC<ProfileAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
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
  );
};
'use client';

import React from 'react';
import { Camera } from 'lucide-react';

interface AvatarSelectorProps {
  avatar: string;
  defaultAvatars: string[];
  onSelectAvatar: (avatarUrl: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  avatar,
  defaultAvatars,
  onSelectAvatar,
  onImageUpload,
}) => {
  return (
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
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Selección rápida de avatares */}
      <div className="flex gap-2 mt-1">
        {defaultAvatars.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectAvatar(item)}
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
  );
};
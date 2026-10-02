import React from 'react';
import { School, Home, Sparkles, UserCheck } from 'lucide-react';
import { UserRole } from '../types/user';

interface LoginModalProps {
  isOpen: boolean;
  onSelectRole: (role: UserRole, userName: string) => void;
  isHighContrast?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onSelectRole,
  isHighContrast = false,
}) => {
  const [name, setName] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState<UserRole>('docente');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectRole(selectedRole, name.trim() || 'Usuario');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
          isHighContrast
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-[#fbf9f5] border-stone-200 text-stone-800'
        }`}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-600 mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">¡Hola! Te damos la bienvenida</h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-1">
            Aula con Corazón & Ecosistema de Acompañamiento Divergente
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre del Usuario */}
          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-stone-600 dark:text-slate-300">
              ¿Cómo te llamas o cómo prefieres que te llamemos?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Maestra Sofía, Mamá de Alex, Carlos..."
              className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 transition ${
                isHighContrast
                  ? 'bg-slate-800 border-slate-600 text-white focus:ring-amber-400'
                  : 'bg-white border-stone-300 text-stone-900 focus:ring-indigo-500'
              }`}
            />
          </div>

          {/* Selección de Rol */}
          <div>
            <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-stone-600 dark:text-slate-300">
              Selecciona tu Perfil de Ingreso:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Opción Docente */}
              <button
                type="button"
                onClick={() => setSelectedRole('docente')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition cursor-pointer ${
                  selectedRole === 'docente'
                    ? isHighContrast
                      ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md'
                      : 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-md'
                    : 'bg-white/70 hover:bg-white text-stone-700 border-stone-200'
                }`}
              >
                <School className="w-6 h-6" />
                <span className="text-xs text-center">Docente / Terapeuta</span>
              </button>

              {/* Opción Hogar/Familia */}
              <button
                type="button"
                onClick={() => setSelectedRole('familia')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition cursor-pointer ${
                  selectedRole === 'familia'
                    ? isHighContrast
                      ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md'
                      : 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-md'
                    : 'bg-white/70 hover:bg-white text-stone-700 border-stone-200'
                }`}
              >
                <Home className="w-6 h-6" />
                <span className="text-xs text-center">Familia / Hogar</span>
              </button>

              {/* Opción Estudiante */}
              <button
                type="button"
                onClick={() => setSelectedRole('estudiante')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition cursor-pointer ${
                  selectedRole === 'estudiante'
                    ? isHighContrast
                      ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md'
                      : 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-md'
                    : 'bg-white/70 hover:bg-white text-stone-700 border-stone-200'
                }`}
              >
                <UserCheck className="w-6 h-6" />
                <span className="text-xs text-center">Estudiante / Usuario</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl font-bold text-sm transition cursor-pointer shadow-lg mt-2 ${
              isHighContrast
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            Ingresar a la Plataforma
          </button>
        </form>
      </div>
    </div>
  );
};
import React from 'react';
import { Volume2, Mic, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { CustomAssignment, Category } from '@/types/reinforcement';
import { useSpeech } from '@/hooks/useSpeech';

interface TaskCardProps {
  item: CustomAssignment;
  isCompleted: boolean;
  activeCategory: Category;
  isTherapist: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  item,
  isCompleted,
  activeCategory,
  isTherapist,
  onToggle,
  onDelete,
}) => {
  const { speak } = useSpeech();
  const isSpeechCategory = activeCategory === 'lenguaje';

  const handleSpeakText = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(`${item.subject}. Escucha atentamente: ${item.title}`);
  };

  return (
    <div
      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition ${
        isCompleted
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
          : 'bg-stone-50 border-stone-200 dark:bg-slate-800 dark:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={handleSpeakText}
          className="p-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-slate-700 dark:text-indigo-300 transition cursor-pointer shrink-0 flex items-center gap-1 font-bold text-xs"
          title="Escuchar modelo de pronunciación"
        >
          <Volume2 className="w-4 h-4" />
        </button>

        <span className={`text-xs font-medium min-w-0 break-words ${isCompleted ? 'line-through opacity-70' : ''}`}>
          {item.title}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isSpeechCategory ? (
          <button
            type="button"
            onClick={() => onToggle(item.id)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isCompleted ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Repetido' : 'Repetir'}</span>
          </button>
        ) : (
          <button type="button" onClick={() => onToggle(item.id)} className="cursor-pointer">
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Circle className="w-5 h-5 text-stone-300 dark:text-slate-600" />
            )}
          </button>
        )}

        <span className="px-2 py-1 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold">
          +10 ⭐
        </span>

        {isTherapist && (
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="p-1 text-stone-400 hover:text-rose-500 transition cursor-pointer"
            title="Eliminar asignación"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
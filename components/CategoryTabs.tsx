import React from 'react';
import { BookOpen, Mic, Heart, UserCheck, Star } from 'lucide-react';
import { Category } from '@/types/reinforcement';

interface CategoryTabsProps {
  activeCategory: Category;
  cardBgClass: string;
  points: number;
  onSelectCategory: (category: Category) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  cardBgClass,
  points,
  onSelectCategory,
}) => {
  const categories: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: 'academico', label: 'Académico', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'lenguaje', label: 'Habla & Lenguaje', icon: <Mic className="w-4 h-4" /> },
    { key: 'social', label: 'Historias Sociales', icon: <Heart className="w-4 h-4" /> },
    { key: 'autonomia', label: 'Autonomía', icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className={`p-2 rounded-3xl border flex flex-wrap gap-2 shadow-sm w-full sm:w-auto flex-1 ${cardBgClass}`}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelectCategory(cat.key)}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 py-2 px-4 bg-amber-400/20 border border-amber-300 dark:border-amber-500/40 rounded-2xl shadow-sm shrink-0">
        <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
        <div className="text-right">
          <span className="block text-[10px] uppercase font-black text-amber-700 dark:text-amber-400 leading-tight">
            Estrellas
          </span>
          <span className="text-lg font-black text-stone-900 dark:text-white leading-none">
            {points} ⭐
          </span>
        </div>
      </div>
    </div>
  );
};
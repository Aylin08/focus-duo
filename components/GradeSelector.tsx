import React from 'react';
import { GRADE_DATA } from '../data/gradesData';

interface Props {
  selectedGrade: string;
  onSelectGrade: (gradeKey: string) => void;
}

export const GradeSelector: React.FC<Props> = ({ selectedGrade, onSelectGrade }) => {
  return (
    <section className="max-w-4xl mx-auto mt-6">
      <div className="bg-white/90 border border-stone-200/80 rounded-3xl p-4 shadow-sm backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <label htmlFor="grade-select" className="text-xs font-bold text-stone-900 block">
            Nivel Educativo o Terapéutico
          </label>
          <p className="text-[11px] text-stone-600 font-medium">
            Selecciona el grado para adaptar la rutina y el enfoque pedagógico
          </p>
        </div>

        <select
          id="grade-select"
          value={selectedGrade}
          onChange={(e) => onSelectGrade(e.target.value)}
          className="bg-stone-100 border border-stone-300 text-stone-900 text-xs sm:text-sm rounded-2xl p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer shadow-inner min-w-[220px]"
        >
          {Object.keys(GRADE_DATA).map((key) => (
            <option key={key} value={key} className="bg-white text-stone-900 font-semibold">
              {GRADE_DATA[key].label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
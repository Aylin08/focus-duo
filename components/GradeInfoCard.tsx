import React from 'react';
import { GradeInfo } from '../data/gradesData';

interface Props {
  gradeInfo: GradeInfo;
  studentStatus: string;
}

export const GradeInfoCard: React.FC<Props> = ({ gradeInfo, studentStatus }) => {
  return (
    <section className="bg-white/90 border border-stone-200/80 rounded-3xl p-5 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-bold text-stone-800">{gradeInfo.label}</h2>
          <p className="text-xs text-stone-500 mt-0.5">Enfoque pedagógico del nivel</p>
        </div>
        <span className="text-2xl">🎓</span>
      </div>
      <div className="bg-stone-100/70 p-3.5 rounded-2xl border border-stone-200/60 mb-3">
        <p className="text-xs text-stone-700 leading-relaxed">{gradeInfo.focus}</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-stone-600">
        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
        <span>Estado: {studentStatus}</span>
      </div>
    </section>
  );
};
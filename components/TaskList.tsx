import React from 'react';

interface Props {
  gradeLabel: string;
  tasks: string[];
}

export const TaskList: React.FC<Props> = ({ gradeLabel, tasks }) => {
  return (
    <section className="bg-white/90 border border-stone-200/80 rounded-3xl p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold text-stone-800">
            Rutina del Día ({gradeLabel})
          </h2>
          <p className="text-xs text-stone-500">Actividades pedagógicas y terapéuticas sugeridas</p>
        </div>
        <span className="text-2xl">📋</span>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task, index) => (
          <label
            key={index}
            className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-stone-100/80 transition cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-emerald-600 rounded-md cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-medium text-stone-700">{task}</span>
          </label>
        ))}
      </div>
    </section>
  );
};
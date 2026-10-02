import React, { useState } from 'react';
import { X, Copy, Check, FileText, Star, Award } from 'lucide-react';
import { usePoints } from '../hooks/usePoints';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHighContrast?: boolean;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, isHighContrast = false }) => {
  const [copied, setCopied] = useState(false);
  const { points } = usePoints();

  if (!isOpen) return null;

  // Obtener misiones completadas desde localStorage
  const savedTasksRaw = localStorage.getItem('aula_reinforcement_tasks');
  const completedTasks: string[] = savedTasksRaw ? JSON.parse(savedTasksRaw) : [];

  const todayDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const reportText = `📋 REPORTE DE JORNADA AULA DIVERGENTE
Fecha: ${todayDate}

⭐ Estrellas Totales: ${points}
✅ Misiones de Refuerzo Completadas: ${completedTasks.length}

¡Excelente trabajo el día de hoy!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border transition-all ${
        isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-900'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base">Resumen de Jornada</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-stone-500 dark:text-slate-400 capitalize">{todayDate}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-center">
              <Star className="w-6 h-6 text-amber-500 mx-auto mb-1 fill-amber-400" />
              <span className="text-xl font-black text-stone-900 dark:text-white block">{points}</span>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">Estrellas</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-center">
              <Award className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
              <span className="text-xl font-black text-stone-900 dark:text-white block">{completedTasks.length}</span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Misiones</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs font-mono text-stone-700 dark:text-slate-300 whitespace-pre-line">
            {reportText}
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Reporte Copiado!' : 'Copiar Reporte para Enviar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
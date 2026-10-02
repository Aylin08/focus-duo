'use client';

import React, { useState, useEffect } from 'react';
import { X, FileText, CheckCircle2, Droplet, ShieldAlert, Printer, Star, Copy, Check, Award } from 'lucide-react';
import { usePoints } from '../hooks/usePoints';

interface SessionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  gradeTitle?: string;
  isHighContrast?: boolean;
}

export const SessionReportModal: React.FC<SessionReportModalProps> = ({
  isOpen,
  onClose,
  gradeTitle = 'Grado Seleccionado',
  isHighContrast = false,
}) => {
  const { points } = usePoints();
  const [waterGlasses, setWaterGlasses] = useState<number>(0);
  const [sensoryState, setSensoryState] = useState<string>('regulado');
  const [completedTasks, setCompletedTasks] = useState<Record<string | number, boolean>>({});
  const [reinforcementTasks, setReinforcementTasks] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedWater = localStorage.getItem('aula_waterGlasses');
      setWaterGlasses(savedWater ? parseInt(savedWater, 10) : 0);

      const savedState = localStorage.getItem('aula_sensoryState');
      setSensoryState(savedState || 'regulado');

      const savedTasks = localStorage.getItem('aula_completedTasks');
      if (savedTasks) {
        try {
          setCompletedTasks(JSON.parse(savedTasks));
        } catch (e) {
          console.error('Error al leer tareas:', e);
        }
      }

      const savedReinforcement = localStorage.getItem('aula_reinforcementTasks');
      if (savedReinforcement) {
        try {
          setReinforcementTasks(JSON.parse(savedReinforcement));
        } catch (e) {
          console.error('Error al leer refuerzos:', e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const completedMissionsCount = reinforcementTasks.filter((t) => t.completed).length;

  // Fecha actual formateada
  const todayDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedDate = todayDate.charAt(0).toUpperCase() + todayDate.slice(1);

  const getSensoryLabel = (state: string) => {
    switch (state) {
      case 'alerta':
      case 'overload':
        return { title: 'Sobrecarga / Alerta' };
      case 'fatiga':
      case 'low_battery':
        return { title: 'Batería Baja / Fatiga' };
      default:
        return { title: 'Regulado & Disponible' };
    }
  };

  const sensoryInfo = getSensoryLabel(sensoryState);

  // Texto premoldeado del reporte para copiar
  const generatedReportText = `📋 REPORTE DE JORNADA AULA DIVERGENTE
Grado: ${gradeTitle}
Fecha: ${formattedDate}

⭐ Estrellas Totales: ${points}
✅ Misiones de Refuerzo Completadas: ${completedMissionsCount}
⚡ Estado de Regulación: ${sensoryInfo.title}
💧 Hidratación: ${waterGlasses} ${waterGlasses === 1 ? 'Vaso de agua' : 'Vasos de agua'}
🎯 Actividades de Rutina: ${completedCount} completadas

¡Excelente trabajo el día de hoy!`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: portrait;
            margin: 0;
          }

          html, body {
            height: 100% !important;
            overflow: hidden !important;
            background: #ffffff !important;
          }

          body * {
            visibility: hidden !important;
          }

          #printable-report,
          #printable-report * {
            visibility: visible !important;
          }

          #printable-report {
            position: absolute !important;
            left: 50% !important;
            top: 20px !important;
            transform: translateX(-50%) !important;
            width: 90% !important;
            max-width: 600px !important;
            margin: 0 !important;
            padding: 24px !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 16px !important;
            background: #ffffff !important;
            color: #000000 !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          id="printable-report"
          className={`w-full max-w-lg rounded-3xl p-6 shadow-xl border transition-all ${
            isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-800'
          }`}
        >
          {/* Cabecera del Modal */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${isHighContrast ? 'bg-amber-400/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Resumen de Jornada</h3>
                <p className={`text-xs capitalize ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
                  {formattedDate} • {gradeTitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl border transition cursor-pointer no-print ${
                isHighContrast ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-stone-100 border-stone-200 text-stone-500 hover:text-stone-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cuerpo del Reporte */}
          <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {/* 1. Tarjetas de Estrellas y Misiones */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white dark:bg-slate-800 border border-slate-800 text-center">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 mx-auto mb-1" />
                <span className="text-2xl font-black block leading-none">{points}</span>
                <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">Estrellas</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 text-white dark:bg-slate-800 border border-slate-800 text-center">
                <Award className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-2xl font-black block leading-none">{completedMissionsCount}</span>
                <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">Misiones</span>
              </div>
            </div>

            {/* 2. Caja con el reporte en formato texto listo para compartir */}
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
              <p className="font-bold text-amber-400">📋 REPORTE DE JORNADA AULA DIVERGENTE</p>
              <p>Fecha: {formattedDate}</p>
              <div className="pt-1 space-y-1">
                <p>⭐ Estrellas Totales: <span className="font-bold text-amber-400">{points}</span></p>
                <p>✅ Misiones de Refuerzo Completadas: <span className="font-bold text-emerald-400">{completedMissionsCount}</span></p>
                <p>⚡ Estado de Regulación: <span className="font-bold text-slate-200">{sensoryInfo.title}</span></p>
                <p>💧 Hidratación: <span className="font-bold text-sky-400">{waterGlasses} {waterGlasses === 1 ? 'Vaso' : 'Vasos'}</span></p>
                <p>🎯 Rutina del Día: <span className="font-bold text-emerald-400">{completedCount} Actividades</span></p>
              </div>
              <p className="text-slate-400 pt-2 italic">¡Excelente trabajo el día de hoy!</p>
            </div>

            {/* 3. Registros de Regulación, Hidratación y Tareas */}
            <div className="space-y-2">
              <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
                isHighContrast ? 'bg-slate-800/80 border-slate-700' : 'bg-stone-50 border-stone-200'
              }`}>
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isHighContrast ? 'text-slate-400' : 'text-stone-400'}`}>Estado de Regulación Final</p>
                  <p className="text-xs font-bold">{sensoryInfo.title}</p>
                </div>
              </div>

              <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
                isHighContrast ? 'bg-slate-800/80 border-slate-700' : 'bg-stone-50 border-stone-200'
              }`}>
                <Droplet className="w-5 h-5 text-sky-500 shrink-0" />
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isHighContrast ? 'text-slate-400' : 'text-stone-400'}`}>Registro de Hidratación</p>
                  <p className="text-xs font-bold">{waterGlasses} {waterGlasses === 1 ? 'Vaso de Agua' : 'Vasos de Agua'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
                isHighContrast ? 'bg-slate-800/80 border-slate-700' : 'bg-stone-50 border-stone-200'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isHighContrast ? 'text-slate-400' : 'text-stone-400'}`}>Actividades Completadas</p>
                  <p className="text-xs font-bold">{completedCount} {completedCount === 1 ? 'Actividad Registrada' : 'Actividades Registradas'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="pt-3 border-t border-stone-200 dark:border-slate-700 flex flex-col gap-2 no-print">
            <button
              onClick={handleCopyText}
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Reporte Copiado al Portapapeles!' : 'Copiar Reporte para Enviar'}</span>
            </button>

            <button
              onClick={handlePrint}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                isHighContrast ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Exportar Reporte</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
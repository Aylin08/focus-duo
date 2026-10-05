'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Bell, CheckCircle2, AlertTriangle, Clock, Smile, Sparkles } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { alerts, markAlertAsRead, canReceiveRealTimeAlerts } = useUser();

  if (!canReceiveRealTimeAlerts) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'semaphore_signal':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'routine_completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'timer_finished':
        return <Clock className="w-5 h-5 text-indigo-500" />;
      case 'sensorial_calm':
        return <Smile className="w-5 h-5 text-sky-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-slate-800 text-indigo-600 rounded-xl">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 dark:text-white text-base">
            Alertas y Eventos Sensoriales
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 rounded-full">
          {alerts.length} eventos
        </span>
      </div>

      {alerts.length === 0 ? (
        <p className="text-xs text-stone-400 dark:text-slate-500 py-4 text-center">
          No hay alertas registradas por el momento.
        </p>
      ) : (
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => markAlertAsRead(alert.id)}
              className={`flex items-start justify-between p-3 rounded-2xl border transition cursor-pointer ${
                alert.read
                  ? 'bg-stone-50 dark:bg-slate-800/40 border-stone-100 dark:border-slate-800/60 opacity-75'
                  : 'bg-white dark:bg-slate-800 border-indigo-100 dark:border-indigo-950 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div>
                  <p className="text-xs font-bold text-stone-800 dark:text-slate-200">
                    {alert.studentName}: <span className="font-normal">{alert.message}</span>
                  </p>
                  <span className="text-[10px] text-stone-400 dark:text-slate-500">
                    {alert.timestamp}
                  </span>
                </div>
              </div>
              {!alert.read && (
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
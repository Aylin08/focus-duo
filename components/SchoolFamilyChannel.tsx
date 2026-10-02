'use client';

import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, BookOpen, User, Calendar, Bell, ShieldCheck } from 'lucide-react';

interface Note {
  id: string;
  sender: 'Escuela' | 'Familia';
  author: string;
  date: string;
  message: string;
  tag?: 'General' | 'Observación' | 'Aviso' | 'Logro';
}

interface SchoolFamilyChannelProps {
  isHighContrast?: boolean;
}

export const SchoolFamilyChannel: React.FC<SchoolFamilyChannelProps> = ({
  isHighContrast = false,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderRole, setSenderRole] = useState<'Escuela' | 'Familia'>('Familia');
  const [selectedTag, setSelectedTag] = useState<'General' | 'Observación' | 'Aviso' | 'Logro'>('General');

  // Cargar notas de localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aula_school_family_notes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error('Error al cargar notas:', e);
      }
    } else {
      // Notas iniciales de ejemplo
      setNotes([
        {
          id: '1',
          sender: 'Escuela',
          author: 'Docente Guía',
          date: 'Hoy, 09:30 AM',
          message: 'Hoy tuvimos una excelente sesión de autorregulación visual. Se mostró participativo en las actividades dinámicas.',
          tag: 'Logro',
        },
      ]);
    }
  }, []);

  // Guardar en localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem('aula_school_family_notes', JSON.stringify(updatedNotes));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      sender: senderRole,
      author: senderRole === 'Escuela' ? 'Docente / Equipo Terapéutico' : 'Familia / Tutor',
      date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      message: newMessage.trim(),
      tag: selectedTag,
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);
    setNewMessage('');
  };

  const getTagStyle = (tag?: string) => {
    switch (tag) {
      case 'Logro':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Observación':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Aviso':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Encabezado del canal */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-800 shadow-sm'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${isHighContrast ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'}`}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Canal Escuela - Familia</h2>
              <p className={`text-xs ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
                Diario de campo, notas pedagógicas y comunicación continua
              </p>
            </div>
          </div>

          {/* Selector de rol emisor */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-slate-800 p-1 rounded-2xl border border-stone-200 dark:border-slate-700">
            <button
              onClick={() => setSenderRole('Familia')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                senderRole === 'Familia'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:text-slate-400'
              }`}
            >
              Familia
            </button>
            <button
              onClick={() => setSenderRole('Escuela')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                senderRole === 'Escuela'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:text-slate-400'
              }`}
            >
              Escuela
            </button>
          </div>
        </div>

        {/* Formulario para publicar notas */}
        <form onSubmit={handleSend} className="mt-6 space-y-3">
          <div className="flex gap-2 flex-wrap text-xs">
            {(['General', 'Logro', 'Observación', 'Aviso'] as const).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full border font-semibold transition ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-transparent text-stone-600 dark:text-slate-300 border-stone-300 dark:border-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Escribir nota como ${senderRole}...`}
              className={`flex-1 px-4 py-3 rounded-2xl border text-sm outline-none transition ${
                isHighContrast
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500'
                  : 'bg-stone-50 border-stone-200 text-stone-800 placeholder-stone-400 focus:border-indigo-500'
              }`}
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Enviar</span>
            </button>
          </div>
        </form>
      </div>

      {/* Historial de Notas del Diario */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-stone-400 text-sm">
            No hay notas registradas en la bitácora aún.
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`p-5 rounded-2xl border transition-all ${
                isHighContrast
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-stone-200 text-stone-800 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${getTagStyle(
                      note.tag
                    )}`}
                  >
                    {note.tag || 'General'}
                  </span>
                  <span className="text-xs font-bold">{note.author}</span>
                </div>
                <span className={`text-[11px] ${isHighContrast ? 'text-slate-400' : 'text-stone-400'}`}>
                  {note.date}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{note.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
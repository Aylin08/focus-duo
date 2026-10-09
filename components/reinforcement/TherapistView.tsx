'use client';

import React, { useState } from 'react';
import { CustomAssignment } from '@/types/reinforcement';
import { TherapistHeader } from '../therapist/TherpistHeader';
import { AssignmentForm } from '../therapist/AssignmentForm';
import { TherapistStatusCards } from '../therapist/TherapistStatusCards';

interface TherapistViewProps {
  isHighContrast?: boolean;
  onAddAssignment?: (assignment: Partial<CustomAssignment>) => void;
  studentsList?: Array<{ id: string; name: string; grade?: string }>;
}

export const TherapistView: React.FC<TherapistViewProps> = ({
  isHighContrast,
  onAddAssignment,
  studentsList = [],
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div
      className={`p-6 rounded-3xl border shadow-sm space-y-4 transition-all ${
        isHighContrast
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white border-stone-200 text-stone-900'
      }`}
    >
      <TherapistHeader
        showForm={showForm}
        onToggleForm={() => setShowForm(!showForm)}
      />

      {showForm && (
        <AssignmentForm
          studentsList={studentsList}
          onAddAssignment={onAddAssignment}
          onClose={() => setShowForm(false)}
        />
      )}

      <TherapistStatusCards />
    </div>
  );
};
import type { AttendanceOption } from '../types/rsvp';

export const ATTENDANCE_OPTIONS: AttendanceOption[] = [
  {
    id: 'both',
    label: 'Je participe aux deux jours',
    description: 'Jeudi repas + Vendredi journée',
    attendance: { thursday: true, friday: true },
    variant: 'success',
  },
  {
    id: 'thursday-only',
    label: 'Seulement le jeudi',
    description: 'Repas de mariage uniquement',
    attendance: { thursday: true, friday: false },
    variant: 'success',
  },
  {
    id: 'friday-only',
    label: 'Seulement le vendredi',
    description: 'Journée détente uniquement',
    attendance: { thursday: false, friday: true },
    variant: 'success',
  },
  {
    id: 'neither',
    label: 'Je ne pourrai pas venir',
    description: 'Malheureusement absent(e)',
    attendance: { thursday: false, friday: false },
    variant: 'error',
  },
];
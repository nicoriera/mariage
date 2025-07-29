import type { Guest } from '../../lib/supabase';

export interface AttendanceState {
  thursday: boolean | null;
  friday: boolean | null;
}

export interface RSVPFormData {
  name: string;
  attendance: AttendanceState;
  message: string;
}

export interface RSVPFormErrors {
  name?: string;
  attendance?: string;
}

export interface RSVPFormProps {
  onSubmitSuccess?: (guest: Guest) => void;
  className?: string;
}

export interface AttendanceOption {
  id: string;
  label: string;
  description: string;
  attendance: AttendanceState;
  variant: 'success' | 'error';
}
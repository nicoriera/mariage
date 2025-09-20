import type { Guest } from "../../lib/supabase";

export interface AttendanceState {
  thursday: boolean | null;
}

export interface ConfirmationFormData {
  name: string;
  attendance: AttendanceState;
  message: string;
}

export interface ConfirmationFormErrors {
  name?: string;
  attendance?: string;
}

export interface ConfirmationFormProps {
  onSubmitSuccess?: (guest: Guest) => void;
  className?: string;
}

// Alias pour la compatibilité
export type RSVPFormData = ConfirmationFormData;
export type RSVPFormErrors = ConfirmationFormErrors;
export type RSVPFormProps = ConfirmationFormProps;

export interface AttendanceOption {
  id: string;
  label: string;
  description: string;
  attendance: AttendanceState;
  variant: "success" | "error";
}

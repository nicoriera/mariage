import { useState, useCallback } from "react";
import { supabase, type Guest } from "../../lib/supabase";
import { withDatabaseRetry } from "../lib/retry";
import type {
  RSVPFormData,
  RSVPFormErrors,
  AttendanceState,
} from "../types/rsvp";

interface UseRSVPFormReturn {
  formData: RSVPFormData;
  errors: RSVPFormErrors;
  isSubmitting: boolean;
  submitMessage: string;
  updateName: (name: string) => void;
  updateAttendance: (attendance: AttendanceState) => void;
  updateMessage: (message: string) => void;
  handleSubmit: (onSuccess?: (guest: Guest) => void) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: RSVPFormData = {
  name: "",
  attendance: { thursday: null },
  message: "",
};

export function useRSVPForm(): UseRSVPFormReturn {
  const [formData, setFormData] = useState<RSVPFormData>(initialFormData);
  const [errors, setErrors] = useState<RSVPFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = useCallback((data: RSVPFormData): RSVPFormErrors => {
    const newErrors: RSVPFormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Merci de renseigner votre nom";
    }

    if (data.attendance.thursday === null) {
      newErrors.attendance = "Merci de répondre à cette question";
    }

    return newErrors;
  }, []);

  const updateName = useCallback(
    (name: string) => {
      setFormData((prev) => ({ ...prev, name }));
      if (errors.name) {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    },
    [errors.name]
  );

  const updateAttendance = useCallback(
    (attendance: AttendanceState) => {
      setFormData((prev) => ({ ...prev, attendance }));
      if (errors.attendance) {
        setErrors((prev) => ({ ...prev, attendance: undefined }));
      }
    },
    [errors.attendance]
  );

  const updateMessage = useCallback((message: string) => {
    setFormData((prev) => ({ ...prev, message }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitMessage("");
  }, []);

  const handleSubmit = useCallback(
    async (onSuccess?: (guest: Guest) => void) => {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      setSubmitMessage("");

      const newGuest = {
        name: formData.name.trim(),
        thursday: formData.attendance.thursday,
        message: formData.message.trim() || null,
      };

      try {
        const result = await withDatabaseRetry(async () => {
          const { data, error } = await supabase
            .from("guests")
            .insert([newGuest])
            .select()
            .single();

          if (error) {
            if (
              error.message.includes('relation "public.guests" does not exist')
            ) {
              throw new Error(
                "Table 'guests' n'existe pas dans Supabase. Créez-la d'abord !"
              );
            } else if (error.message.includes("Invalid API key")) {
              throw new Error(
                "Clés Supabase invalides. Vérifiez votre .env.local"
              );
            } else {
              throw new Error(`Erreur: ${error.message}`);
            }
          }

          return data;
        });

        setSubmitMessage("Merci ! Votre réponse a été enregistrée 💕");
        resetForm();

        if (onSuccess && result) {
          onSuccess(result);
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Une erreur inattendue s'est produite";
        setSubmitMessage(`❌ ${errorMessage}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, resetForm]
  );

  return {
    formData,
    errors,
    isSubmitting,
    submitMessage,
    updateName,
    updateAttendance,
    updateMessage,
    handleSubmit,
    resetForm,
  };
}

import { useState, useCallback, useEffect, useRef } from "react";
import { supabase, type Guest } from "../../lib/supabase";
import { withDatabaseRetry } from "../lib/retry";
import type {
  ConfirmationFormData,
  ConfirmationFormErrors,
  AttendanceState,
} from "../types/rsvp";

interface UseConfirmationFormReturn {
  formData: ConfirmationFormData;
  errors: ConfirmationFormErrors;
  isSubmitting: boolean;
  submitMessage: string;
  updateName: (name: string) => void;
  updateAttendance: (attendance: AttendanceState) => void;
  updateMessage: (message: string) => void;
  handleSubmit: (onSuccess?: (guest: Guest) => void) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ConfirmationFormData = {
  name: "",
  attendance: { thursday: null },
  message: "",
};

export function useConfirmationForm(): UseConfirmationFormReturn {
  const [formData, setFormData] =
    useState<ConfirmationFormData>(initialFormData);
  const [errors, setErrors] = useState<ConfirmationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const hasPrefilledRef = useRef(false);

  useEffect(() => {
    const getStoredGuestId = (): string | null => {
      try {
        return typeof window !== "undefined"
          ? window.localStorage.getItem("rsvpGuestId")
          : null;
      } catch {
        return null;
      }
    };

    const prefillFromExisting = async () => {
      if (hasPrefilledRef.current) return;
      const existingId = getStoredGuestId();
      if (!existingId) return;

      const { data, error } = await supabase
        .from("guests")
        .select("name, thursday, message")
        .eq("id", existingId)
        .single();

      if (!error && data) {
        setFormData({
          name: data.name ?? "",
          attendance: { thursday: data.thursday as boolean | null },
          message: data.message ?? "",
        });
        hasPrefilledRef.current = true;
      }
    };

    void prefillFromExisting();
  }, []);

  const validateForm = useCallback(
    (data: ConfirmationFormData): ConfirmationFormErrors => {
      const newErrors: ConfirmationFormErrors = {};

      if (!data.name.trim()) {
        newErrors.name = "Merci de renseigner votre nom";
      }

      if (data.attendance.thursday === null) {
        newErrors.attendance = "Merci de répondre à cette question";
      }

      return newErrors;
    },
    []
  );

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
        const getStoredGuestId = (): string | null => {
          try {
            return typeof window !== "undefined"
              ? window.localStorage.getItem("rsvpGuestId")
              : null;
          } catch {
            return null;
          }
        };

        const storeGuestId = (id?: string | number | null) => {
          if (id == null) return;
          try {
            if (typeof window !== "undefined") {
              window.localStorage.setItem("rsvpGuestId", String(id));
            }
          } catch {
            // ignore storage failures
          }
        };

        const existingId = getStoredGuestId();

        const result = await withDatabaseRetry(async () => {
          // If we already know the row id, perform an update by id
          if (existingId) {
            const { data, error } = await supabase
              .from("guests")
              .update(newGuest)
              .eq("id", existingId)
              .select()
              .single();

            if (error) {
              throw new Error(`Erreur: ${error.message}`);
            }
            return data;
          }

          // Otherwise, try to insert first
          const { data, error } = await supabase
            .from("guests")
            .insert([newGuest])
            .select()
            .single();

          if (error) {
            // If unique constraint on name triggers, fallback to update by name
            const code = (error as unknown as { code?: string }).code;
            if (code === "23505") {
              const { data: updated, error: updateErr } = await supabase
                .from("guests")
                .update(newGuest)
                .eq("name", newGuest.name)
                .select()
                .single();

              if (updateErr) {
                throw new Error(`Erreur: ${updateErr.message}`);
              }
              return updated;
            }

            if (
              error.message.includes('relation "public.guests" does not exist')
            ) {
              throw new Error(
                "Table 'guests' n'existe pas dans Supabase. Créez-la d'abord !"
              );
            }
            if (error.message.includes("Invalid API key")) {
              throw new Error(
                "Clés Supabase invalides. Vérifiez votre .env.local"
              );
            }

            throw new Error(`Erreur: ${error.message}`);
          }

          return data;
        });

        setSubmitMessage("Merci ! Votre réponse a été enregistrée 💕");
        resetForm();

        if (onSuccess && result) {
          onSuccess(result);
        }

        // Persist id locally to enable later edits from same device
        storeGuestId(result?.id);
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

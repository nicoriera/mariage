"use client";

import React, { useState } from "react";
import { Send, CheckCircle, XCircle, Users } from "lucide-react";
import { Button } from "./ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/Card";
import { Input, Textarea, Label } from "./ui/Input";
import { Text } from "./ui/Typography";
import { supabase, type Guest } from "../../lib/supabase";
import { cn } from "../lib/utils";

interface AttendanceState {
  thursday: boolean | null;
  friday: boolean | null;
}

interface RSVPFormProps {
  onSubmitSuccess?: (guest: Guest) => void;
}

export default function RSVPForm({ onSubmitSuccess }: RSVPFormProps) {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceState>({
    thursday: null,
    friday: null,
  });
  const [guestMessage, setGuestMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!guestName.trim()) {
      newErrors.name = "Merci de renseigner votre nom";
    }

    if (attendance.thursday === null && attendance.friday === null) {
      newErrors.attendance = "Merci de choisir au moins un événement";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    const newGuest = {
      name: guestName.trim(),
      thursday: attendance.thursday,
      friday: attendance.friday,
      message: guestMessage.trim() || null,
    };

    try {
      const { data, error } = await supabase
        .from("guests")
        .insert([newGuest])
        .select()
        .single();

      if (error) {
        console.error("Erreur Supabase:", error);
        if (error.message.includes('relation "public.guests" does not exist')) {
          setSubmitMessage(
            "❌ Table 'guests' n'existe pas dans Supabase. Créez-la d'abord !"
          );
        } else if (error.message.includes("Invalid API key")) {
          setSubmitMessage(
            "❌ Clés Supabase invalides. Vérifiez votre .env.local"
          );
        } else {
          setSubmitMessage(`❌ Erreur: ${error.message}`);
        }
      } else {
        setSubmitMessage("Merci ! Votre réponse a été enregistrée 💕");
        setGuestName("");
        setAttendance({ thursday: null, friday: null });
        setGuestMessage("");
        setErrors({});

        if (onSubmitSuccess && data) {
          onSubmitSuccess(data);
        }
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
      setSubmitMessage("❌ Une erreur inattendue s'est produite");
    }

    setIsSubmitting(false);
  };

  return (
    <Card variant="elevated" className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-primary">
          <Users className="w-8 h-8" />
          Confirmez votre présence
        </CardTitle>
        <Text variant="muted">
          Merci de confirmer votre participation à nos célébrations
        </Text>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de l'invité */}
          <div>
            <Label required>Votre nom</Label>
            <Input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Entrez votre nom complet"
              error={!!errors.name}
            />
            {errors.name && (
              <Text size="sm" className="text-coral-600 mt-1">
                {errors.name}
              </Text>
            )}
          </div>

          {/* Événements */}
          <div>
            <Label required>Confirmez votre participation</Label>
            {errors.attendance && (
              <Text size="sm" className="text-coral-600 mb-3">
                {errors.attendance}
              </Text>
            )}

            <div className="space-y-3">
              {/* Options simplifiées */}
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setAttendance({ thursday: true, friday: true })
                  }
                  className={cn(
                    "p-4 border-2 rounded-lg text-left transition-all duration-200",
                    attendance.thursday === true && attendance.friday === true
                      ? "border-sage-500 bg-sage-50 text-sage-700"
                      : "border-stone-200 hover:border-stone-300"
                  )}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-stone-800">
                        Je participe aux deux jours
                      </div>
                      <div className="text-sm text-stone-600 mt-1">
                        Jeudi repas + Vendredi journée
                      </div>
                    </div>
                    {attendance.thursday === true &&
                      attendance.friday === true && (
                        <CheckCircle className="w-5 h-5 text-sage-600" />
                      )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAttendance({ thursday: true, friday: false })
                  }
                  className={cn(
                    "p-4 border-2 rounded-lg text-left transition-all duration-200",
                    attendance.thursday === true && attendance.friday === false
                      ? "border-sage-500 bg-sage-50 text-sage-700"
                      : "border-stone-200 hover:border-stone-300"
                  )}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-stone-800">
                        Seulement le jeudi
                      </div>
                      <div className="text-sm text-stone-600 mt-1">
                        Repas de mariage uniquement
                      </div>
                    </div>
                    {attendance.thursday === true &&
                      attendance.friday === false && (
                        <CheckCircle className="w-5 h-5 text-sage-600" />
                      )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAttendance({ thursday: false, friday: true })
                  }
                  className={cn(
                    "p-4 border-2 rounded-lg text-left transition-all duration-200",
                    attendance.thursday === false && attendance.friday === true
                      ? "border-sage-500 bg-sage-50 text-sage-700"
                      : "border-stone-200 hover:border-stone-300"
                  )}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-stone-800">
                        Seulement le vendredi
                      </div>
                      <div className="text-sm text-stone-600 mt-1">
                        Journée détente uniquement
                      </div>
                    </div>
                    {attendance.thursday === false &&
                      attendance.friday === true && (
                        <CheckCircle className="w-5 h-5 text-sage-600" />
                      )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAttendance({ thursday: false, friday: false })
                  }
                  className={cn(
                    "p-4 border-2 rounded-lg text-left transition-all duration-200",
                    attendance.thursday === false && attendance.friday === false
                      ? "border-coral-500 bg-coral-50 text-coral-700"
                      : "border-stone-200 hover:border-stone-300"
                  )}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-stone-800">
                        Je ne pourrai pas venir
                      </div>
                      <div className="text-sm text-stone-600 mt-1">
                        Malheureusement absent(e)
                      </div>
                    </div>
                    {attendance.thursday === false &&
                      attendance.friday === false && (
                        <XCircle className="w-5 h-5 text-coral-600" />
                      )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Message personnel */}
          <div>
            <Label>Message personnel (optionnel)</Label>
            <Textarea
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              placeholder="Écrivez-nous un petit mot..."
              rows={4}
            />
          </div>

          {/* Message de confirmation */}
          {submitMessage && (
            <Card
              variant="bordered"
              className={`p-4 text-center ${
                submitMessage.includes("Merci")
                  ? "border-sage-500 bg-sage-50 text-sage-600"
                  : "border-coral-500 bg-coral-50 text-coral-600"
              }`}>
              <Text className="font-medium">{submitMessage}</Text>
            </Card>
          )}
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          onClick={handleSubmit}
          className="w-full">
          <Send className="w-5 h-5" />
          {isSubmitting ? "Envoi en cours..." : "Confirmer ma présence"}
        </Button>
      </CardFooter>
    </Card>
  );
}

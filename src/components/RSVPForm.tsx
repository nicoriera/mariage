"use client";

import React from "react";
import { Send, Users } from "lucide-react";
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
import { useRSVPForm } from "../hooks/useRSVPForm";
import AttendanceOption from "./AttendanceOption";
import { ATTENDANCE_OPTIONS } from "../constants/attendance";
import type { RSVPFormProps } from "../types/rsvp";

const RSVPForm = React.memo<RSVPFormProps>(({ onSubmitSuccess, className }) => {
  const {
    formData,
    errors,
    isSubmitting,
    submitMessage,
    updateName,
    updateAttendance,
    updateMessage,
    handleSubmit,
  } = useRSVPForm();

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onSubmitSuccess);
  };

  const isAttendanceSelected = (optionAttendance: { thursday: boolean | null; friday: boolean | null }) => {
    return formData.attendance.thursday === optionAttendance.thursday &&
           formData.attendance.friday === optionAttendance.friday;
  };

  return (
    <Card variant="elegant" className={`max-w-2xl mx-auto ${className || ''}`}>
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
        <form onSubmit={onFormSubmit} className="space-y-6">
          {/* Nom de l'invité */}
          <div>
            <Label required>Votre nom</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => updateName(e.target.value)}
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
              <div className="grid grid-cols-1 gap-3">
                {ATTENDANCE_OPTIONS.map((option) => (
                  <AttendanceOption
                    key={option.id}
                    {...option}
                    isSelected={isAttendanceSelected(option.attendance)}
                    onClick={() => updateAttendance(option.attendance)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Message personnel */}
          <div>
            <Label>Message personnel (optionnel)</Label>
            <Textarea
              value={formData.message}
              onChange={(e) => updateMessage(e.target.value)}
              placeholder="Écrivez-nous un petit mot..."
              rows={4}
            />
          </div>

          {/* Message de confirmation */}
          {submitMessage && (
            <Card
              variant="elegant"
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
          onClick={onFormSubmit}
          className="w-full">
          <Send className="w-5 h-5" />
          {isSubmitting ? "Envoi en cours..." : "Confirmer ma présence"}
        </Button>
      </CardFooter>
    </Card>
  );
});

RSVPForm.displayName = 'RSVPForm';

export default RSVPForm;

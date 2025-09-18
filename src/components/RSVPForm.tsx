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

  return (
    <Card variant="elegant" className={`max-w-2xl mx-auto ${className || ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-primary">
          <Users className="w-8 h-8" />
          On compte sur vous !
        </CardTitle>
        <Text variant="muted">
          Merci de confirmer votre participation à nos célébrations
        </Text>
      </CardHeader>

      <CardContent>
        <form onSubmit={onFormSubmit} className="space-y-6">
          {/* Nom du convive */}
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

          {/* Réservation jeudi */}
          <div>
            <Label required>Serez-vous des nôtres le jeudi ?</Label>
            {errors.attendance && (
              <Text size="sm" className="text-coral-600 mb-3">
                {errors.attendance}
              </Text>
            )}
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="thursday"
                  checked={formData.attendance.thursday === true}
                  onChange={() =>
                    updateAttendance({ thursday: true, friday: null })
                  }
                  className="accent-primary"
                />
                Oui
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="thursday"
                  checked={formData.attendance.thursday === false}
                  onChange={() =>
                    updateAttendance({ thursday: false, friday: null })
                  }
                  className="accent-primary"
                />
                Non
              </label>
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
          {isSubmitting ? "Envoi en cours..." : "Je confirme ma venue !"}
        </Button>
      </CardFooter>
    </Card>
  );
});

RSVPForm.displayName = "RSVPForm";

export default RSVPForm;

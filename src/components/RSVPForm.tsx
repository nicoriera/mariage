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
import { useConfirmationForm } from "../hooks/useRSVPForm";
import type { ConfirmationFormProps } from "../types/rsvp";

const ConfirmationForm = React.memo<ConfirmationFormProps>(
  ({ onSubmitSuccess, className }) => {
    const {
      formData,
      errors,
      isSubmitting,
      submitMessage,
      updateName,
      updateAttendance,
      updateMessage,
      handleSubmit,
    } = useConfirmationForm();

    const onFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await handleSubmit(onSubmitSuccess);
    };

    return (
      <Card
        variant="elegant"
        className={`max-w-2xl mx-auto bg-white border border-black/80 ${
          className || ""
        }`}>
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
                    onChange={() => updateAttendance({ thursday: true })}
                    className="accent-black"
                  />
                  Oui
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="thursday"
                    checked={formData.attendance.thursday === false}
                    onChange={() => updateAttendance({ thursday: false })}
                    className="accent-black"
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
                className={`p-4 text-center bg-white border border-black/80`}>
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
  }
);

ConfirmationForm.displayName = "ConfirmationForm";

export default ConfirmationForm;

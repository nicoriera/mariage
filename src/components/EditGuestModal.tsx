"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Input, Label } from "./ui/Input";
import { Modal } from "./ui/Modal";
import { Heading } from "./ui/Typography";
import { Guest } from "../../lib/supabase";

interface EditGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: Guest | null;
  onSave: (
    id: string,
    data: Partial<Guest>
  ) => Promise<{ success: boolean; error?: string }>;
}

export default function EditGuestModal({
  isOpen,
  onClose,
  guest,
  onSave,
}: EditGuestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    thursday: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mettre à jour le formulaire quand l'invité change
  useState(() => {
    if (guest) {
      setFormData({
        name: guest.name || "",
        thursday: guest.thursday || false,
        message: guest.message || "",
      });
      setError("");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest) return;

    setLoading(true);
    setError("");

    const result = await onSave(guest.id, formData);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || "Erreur lors de la modification");
    }

    setLoading(false);
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!guest) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <div className="mb-6">
          <Heading level={3} variant="elegant" className="mb-2">
            Modifier l'invité
          </Heading>
          <p className="text-sm text-gray-600">
            Modifiez les informations de {guest.name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label required>Nom</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nom de l'invité"
              error={!formData.name.trim()}
            />
          </div>

          <div>
            <Label>Présent au repas du jeudi</Label>
            <div className="mt-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="thursday"
                  checked={formData.thursday === true}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, thursday: true }))
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Oui, je serai présent
                </span>
              </label>
              <label className="flex items-center space-x-3 mt-2">
                <input
                  type="radio"
                  name="thursday"
                  checked={formData.thursday === false}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, thursday: false }))
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Non, je ne serai pas présent
                </span>
              </label>
            </div>
          </div>

          <div>
            <Label>Message (optionnel)</Label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Laissez un message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}>
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading || !formData.name.trim()}>
              {loading ? "Modification..." : "Modifier"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

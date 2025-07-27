"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  Send,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { supabase, type Guest } from "../../lib/supabase";

export default function WeddingRSVP() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState({
    thursday: null as boolean | null,
    friday: null as boolean | null,
  });
  const [guestMessage, setGuestMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetchGuests();
  }, []);

  async function fetchGuests() {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur:", error);
    } else {
      setGuests(data || []);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!guestName.trim()) {
      setSubmitMessage("Merci de renseigner votre nom");
      return;
    }

    if (attendance.thursday === null && attendance.friday === null) {
      setSubmitMessage("Merci de choisir au moins un événement");
      return;
    }

    setIsSubmitting(true);

    const newGuest = {
      name: guestName,
      thursday: attendance.thursday,
      friday: attendance.friday,
      message: guestMessage || null,
    };

    const { error } = await supabase.from("guests").insert([newGuest]);

    if (error) {
      console.error("Erreur Supabase:", error);
      if (error.message.includes('relation "public.guests" does not exist')) {
        setSubmitMessage("❌ Table 'guests' n'existe pas dans Supabase. Créez-la d'abord !");
      } else if (error.message.includes('Invalid API key')) {
        setSubmitMessage("❌ Clés Supabase invalides. Vérifiez votre .env.local");
      } else {
        setSubmitMessage(`❌ Erreur: ${error.message}`);
      }
    } else {
      setSubmitMessage("Merci ! Votre réponse a été enregistrée 💕");
      setGuestName("");
      setAttendance({ thursday: null, friday: null });
      setGuestMessage("");
      fetchGuests();
    }

    setIsSubmitting(false);
  }

  const thursdayCount = guests.filter((g) => g.thursday === true).length;
  const fridayCount = guests.filter((g) => g.friday === true).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Notre Mariage
          </h1>
          <p className="text-lg text-gray-600">
            Confirmez votre présence pour nos célébrations
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre nom
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Entrez votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                À quels événements participerez-vous ?
              </label>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">
                      Jeudi soir
                    </span>
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Dîner de répétition
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setAttendance({ ...attendance, thursday: true })
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        attendance.thursday === true
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-gray-300 hover:border-green-500"
                      }`}>
                      <CheckCircle className="w-4 h-4" />
                      Oui
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAttendance({ ...attendance, thursday: false })
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        attendance.thursday === false
                          ? "bg-red-100 border-red-500 text-red-700"
                          : "border-gray-300 hover:border-red-500"
                      }`}>
                      <XCircle className="w-4 h-4" />
                      Non
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">
                      Vendredi midi
                    </span>
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Cérémonie et réception
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setAttendance({ ...attendance, friday: true })
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        attendance.friday === true
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-gray-300 hover:border-green-500"
                      }`}>
                      <CheckCircle className="w-4 h-4" />
                      Oui
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAttendance({ ...attendance, friday: false })
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        attendance.friday === false
                          ? "bg-red-100 border-red-500 text-red-700"
                          : "border-gray-300 hover:border-red-500"
                      }`}>
                      <XCircle className="w-4 h-4" />
                      Non
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message personnel (optionnel)
              </label>
              <textarea
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Écrivez un petit mot..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              {isSubmitting ? "Envoi..." : "Confirmer ma présence"}
            </button>

            {submitMessage && (
              <div
                className={`text-center p-3 rounded-lg ${
                  submitMessage.includes("Merci")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Qui vient ?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {thursdayCount}
              </div>
              <div className="text-sm text-blue-800">Jeudi soir</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {fridayCount}
              </div>
              <div className="text-sm text-purple-800">Vendredi midi</div>
            </div>
          </div>

          <div className="space-y-3">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{guest.name}</h3>
                  <div className="flex gap-2">
                    {guest.thursday && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Jeudi
                      </span>
                    )}
                    {guest.friday && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        Vendredi
                      </span>
                    )}
                  </div>
                </div>
                {guest.message && (
                  <p className="text-gray-600 text-sm italic">
                    &ldquo;{guest.message}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

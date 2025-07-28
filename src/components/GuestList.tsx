"use client";

import React, { useState, useEffect } from "react";
import { Users, Calendar, MessageCircle, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Heading, Text, Badge } from "./ui/Typography";
import { supabase, type Guest } from "../../lib/supabase";

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuests();

    // Écouter les changements en temps réel
    const channel = supabase
      .channel("guests_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "guests" },
        () => {
          fetchGuests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGuests = async () => {
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur:", error);
      } else {
        setGuests(data || []);
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
    } finally {
      setLoading(false);
    }
  };

  const thursdayCount = guests.filter((g) => g.thursday === true).length;
  const fridayCount = guests.filter((g) => g.friday === true).length;
  const totalGuests = guests.length;

  if (loading) {
    return (
      <Card variant="elegant" className="max-w-4xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-sezane-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <Text variant="muted">Chargement des confirmations...</Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Statistiques */}
      <Card variant="accent" className="bg-sezane-accent border-sezane-accent">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Users className="w-8 h-8" />
            Nos invités confirment leur présence !
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 font-heading text-white">
                {totalGuests}
              </div>
              <Text className="text-white/90">Réponses reçues</Text>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 font-heading text-white">
                {thursdayCount}
              </div>
              <Text className="text-white/90">Jeudi repas</Text>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 font-heading text-white">
                {fridayCount}
              </div>
              <Text className="text-white/90">Vendredi journée</Text>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des invités */}
      <Card variant="elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-sezane-primary">
            <Heart className="w-6 h-6" />
            Qui vient partager notre bonheur ?
          </CardTitle>
          {totalGuests === 0 && (
            <Text variant="muted">
              Aucune confirmation reçue pour le moment. Soyez les premiers !
            </Text>
          )}
        </CardHeader>

        {totalGuests > 0 && (
          <CardContent>
            <div className="space-y-4">
              {guests.map((guest) => (
                <Card
                  key={guest.id}
                  variant="default"
                  className="p-4 hover:shadow-sezane-md transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <Heading level={5} className="mb-2">
                        {guest.name}
                      </Heading>

                      {guest.message && (
                        <div className="flex items-start gap-2 mb-3">
                          <MessageCircle className="w-4 h-4 text-sezane-accent mt-1 flex-shrink-0" />
                          <Text
                            size="sm"
                            variant="muted"
                            className="italic border-l-2 border-sezane-accent/20 pl-3">
                            &ldquo;{guest.message}&rdquo;
                          </Text>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {guest.thursday && (
                        <Badge
                          variant="accent"
                          className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Repas Jeudi
                        </Badge>
                      )}
                      {guest.friday && (
                        <Badge
                          variant="rose"
                          className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Journée Vendredi
                        </Badge>
                      )}
                      {!guest.thursday && !guest.friday && (
                        <Badge
                          variant="default"
                          className="flex items-center gap-1">
                          Ne peut pas venir
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

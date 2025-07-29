"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Text } from "./ui/Typography";
import { useGuests } from "../hooks/useGuests";
import GuestStatsCard from "./GuestStatsCard";
import GuestCard from "./GuestCard";
import LoadingCard from "./LoadingCard";
import ErrorCard from "./ErrorCard";

const GuestList = React.memo(() => {
  const { guests, loading, error, stats, refetch } = useGuests();
  const { totalGuests, thursdayCount, fridayCount } = stats;

  if (loading) {
    return <LoadingCard />;
  }

  if (error) {
    return <ErrorCard error={error} onRetry={refetch} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <GuestStatsCard 
        totalGuests={totalGuests}
        thursdayCount={thursdayCount}
        fridayCount={fridayCount}
      />

      {/* Liste des invités */}
      <Card variant="elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[#2a2a2a]">
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
                <GuestCard key={guest.id} guest={guest} />
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
});

GuestList.displayName = 'GuestList';

export default GuestList;

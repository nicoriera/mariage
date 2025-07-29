import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Heading, Text, Badge } from './ui/Typography';
import type { Guest } from '../../lib/supabase';

interface GuestCardProps {
  guest: Guest;
}

const GuestCard = React.memo<GuestCardProps>(({ guest }) => (
  <Card
    variant="default"
    className="p-4 hover:shadow-md transition-all duration-200">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1">
        <Heading level={5} className="mb-2">
          {guest.name}
        </Heading>

        {guest.message && (
          <div className="flex items-start gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-[#9db380] mt-1 flex-shrink-0" />
            <Text
              size="sm"
              variant="muted"
              className="italic border-l-2 border-[#9db380]/20 pl-3">
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
));

GuestCard.displayName = 'GuestCard';

export default GuestCard;
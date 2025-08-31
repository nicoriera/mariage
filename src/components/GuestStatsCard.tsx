import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Text } from './ui/Typography';

interface GuestStatsCardProps {
  totalGuests: number;
  thursdayCount: number;
}

const GuestStatsCard = React.memo<GuestStatsCardProps>(({ 
  totalGuests, 
  thursdayCount
}) => (
  <Card variant="accent" className="bg-[#9db380] border-[#9db380]">
    <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
          <Users className="w-8 h-8" />
          Nos convives confirment leur présence !
        </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Text className="text-white/90">Présents au repas</Text>
        </div>
      </div>
    </CardContent>
  </Card>
));

GuestStatsCard.displayName = 'GuestStatsCard';

export default GuestStatsCard;
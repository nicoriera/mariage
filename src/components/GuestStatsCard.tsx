import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Text } from './ui/Typography';

interface GuestStatsCardProps {
  totalGuests: number;
  thursdayCount: number;
  fridayCount: number;
}

const GuestStatsCard = React.memo<GuestStatsCardProps>(({ 
  totalGuests, 
  thursdayCount, 
  fridayCount 
}) => (
  <Card variant="accent" className="bg-[#9db380] border-[#9db380]">
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
));

GuestStatsCard.displayName = 'GuestStatsCard';

export default GuestStatsCard;
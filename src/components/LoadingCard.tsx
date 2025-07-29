import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Text } from './ui/Typography';

const LoadingCard = React.memo(() => (
  <Card variant="elegant" className="max-w-4xl mx-auto">
    <CardContent className="text-center py-12">
      <div className="animate-spin w-8 h-8 border-4 border-[#9db380] border-t-transparent rounded-full mx-auto mb-4"></div>
      <Text variant="muted">Chargement des confirmations...</Text>
    </CardContent>
  </Card>
));

LoadingCard.displayName = 'LoadingCard';

export default LoadingCard;
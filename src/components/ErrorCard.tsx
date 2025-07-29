import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Text, Heading } from './ui/Typography';
import { Button } from './ui/Button';

interface ErrorCardProps {
  error: string;
  onRetry?: () => void;
}

const ErrorCard = React.memo<ErrorCardProps>(({ error, onRetry }) => (
  <Card variant="elegant" className="max-w-4xl mx-auto border-red-200">
    <CardContent className="text-center py-12">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <Heading level={4} className="text-red-700 mb-2">
        Une erreur est survenue
      </Heading>
      <Text variant="muted" className="mb-4">
        {error}
      </Text>
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="flex items-center gap-2 mx-auto">
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </Button>
      )}
    </CardContent>
  </Card>
));

ErrorCard.displayName = 'ErrorCard';

export default ErrorCard;
import React, { useEffect, useRef } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Text, Heading } from "./ui/Typography";
import { Button } from "./ui/Button";

interface ErrorCardProps {
  error: string;
  onRetry?: () => void;
  autoFocus?: boolean;
}

const ErrorCard = React.memo<ErrorCardProps>(
  ({ error, onRetry, autoFocus }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (autoFocus && containerRef.current) {
        containerRef.current.focus();
        try {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } catch {
          // ignore scroll failures
        }
      }
    }, [autoFocus]);

    return (
      <Card variant="elegant" className="max-w-4xl mx-auto border-red-200">
        <CardContent
          ref={containerRef}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="text-center py-12">
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
    );
  }
);

ErrorCard.displayName = "ErrorCard";

export default ErrorCard;

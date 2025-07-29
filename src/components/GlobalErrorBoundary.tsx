"use client";

import React from 'react';
import ErrorBoundary from './ErrorBoundary';

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

const GlobalErrorBoundary: React.FC<GlobalErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log to console in development
    console.error('Global Error Boundary:', error, errorInfo);

    // In production, you would send this to an error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example integrations:
      // - Sentry: Sentry.captureException(error, { contexts: { react: errorInfo } });
      // - LogRocket: LogRocket.captureException(error);
      // - Custom API: sendErrorToAPI(error, errorInfo);
      
      // For now, we'll just log it
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(err => {
        console.error('Failed to log error to API:', err);
      });
    }
  };

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
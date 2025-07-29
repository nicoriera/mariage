"use client";

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Heading, Text } from './ui/Typography';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you could send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-june-cream flex items-center justify-center p-4">
          <Card variant="elegant" className="max-w-lg mx-auto border-coral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-coral-700">
                <AlertTriangle className="w-8 h-8" />
                Oups, quelque chose s'est mal passé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Heading level={4} className="text-stone-800 mb-2">
                  Une erreur inattendue est survenue
                </Heading>
                <Text variant="muted" className="mb-4">
                  Nous nous excusons pour ce désagrément. Notre équipe a été automatiquement 
                  notifiée et travaille à résoudre le problème.
                </Text>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <Heading level={5} className="text-red-800 mb-2">
                    Détails de l'erreur (mode développement)
                  </Heading>
                  <Text size="sm" className="text-red-700 font-mono whitespace-pre-wrap">
                    {this.state.error.message}
                  </Text>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-red-700 cursor-pointer hover:text-red-800">
                        Stack trace
                      </summary>
                      <Text size="xs" className="text-red-600 font-mono whitespace-pre-wrap mt-2">
                        {this.state.errorInfo.componentStack}
                      </Text>
                    </details>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Réessayer
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Retour à l'accueil
                </Button>
              </div>

              <div className="bg-june-surface border border-june rounded-lg p-4">
                <Text size="sm" variant="muted" className="text-center">
                  Si le problème persiste, n'hésitez pas à nous contacter à{' '}
                  <a 
                    href="mailto:sandra.nicolas.mariage@example.com" 
                    className="text-june-accent hover:underline"
                  >
                    sandra.nicolas.mariage@example.com
                  </a>
                </Text>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
// Simple analytics and error tracking for the wedding application

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: string;
  sessionId: string;
  userAgent: string;
  url: string;
}

interface ErrorEvent {
  error: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  sessionId: string;
  userAgent: string;
  url: string;
  userId?: string;
}

class WeddingAnalytics {
  private sessionId: string;
  private isProduction: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isProduction = process.env.NODE_ENV === "production";
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private getBaseEventData() {
    return {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      url: typeof window !== "undefined" ? window.location.href : "unknown",
    };
  }

  // Track user interactions
  track(event: string, properties?: Record<string, unknown>) {
    if (!this.isProduction) {
      console.log(`[Analytics] ${event}`, properties);
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      ...this.getBaseEventData(),
    };

    // In production, send to your analytics service
    this.sendToAnalyticsService(analyticsEvent);
  }

  // Track errors
  trackError(error: Error, componentStack?: string, userId?: string) {
    const errorEvent: ErrorEvent = {
      error: error.message,
      stack: error.stack,
      componentStack,
      userId,
      ...this.getBaseEventData(),
    };

    if (!this.isProduction) {
      console.error("[Analytics Error]", errorEvent);
      return;
    }

    // In production, send to your error tracking service
    this.sendToErrorService(errorEvent);
  }

  // Track page views
  trackPageView(page: string, title?: string) {
    this.track("page_view", {
      page,
      title: title || document.title,
      referrer: document.referrer,
    });
  }

  // Track confirmation submissions
  trackConfirmation(data: {
    name: string;
    thursday: boolean | null;
    hasMessage: boolean;
  }) {
    this.track("confirmation_submitted", {
      thursday: data.thursday,
      hasMessage: data.hasMessage,
      // Don't track personal data like names
    });
  }

  // Track admin actions
  trackAdminAction(action: string, properties?: Record<string, unknown>) {
    this.track("admin_action", {
      action,
      ...properties,
    });
  }

  private async sendToAnalyticsService(event: AnalyticsEvent) {
    try {
      // Example: Send to your analytics endpoint
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("Failed to send analytics event:", error);
    }
  }

  private async sendToErrorService(errorEvent: ErrorEvent) {
    try {
      // Example: Send to your error tracking endpoint
      await fetch("/api/errors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorEvent),
      });
    } catch (error) {
      console.error("Failed to send error event:", error);
    }
  }
}

// Create singleton instance
export const analytics = new WeddingAnalytics();

// Convenience functions
export const trackEvent = (
  event: string,
  properties?: Record<string, unknown>
) => {
  analytics.track(event, properties);
};

export const trackError = (
  error: Error,
  componentStack?: string,
  userId?: string
) => {
  analytics.trackError(error, componentStack, userId);
};

export const trackPageView = (page: string, title?: string) => {
  analytics.trackPageView(page, title);
};

export const trackConfirmation = (data: {
  name: string;
  thursday: boolean | null;
  hasMessage: boolean;
}) => {
  analytics.trackConfirmation(data);
};

export const trackAdminAction = (
  action: string,
  properties?: Record<string, unknown>
) => {
  analytics.trackAdminAction(action, properties);
};

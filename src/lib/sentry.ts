import * as Sentry from "@sentry/react";

/**
 * Capture an API error with context
 */
export const captureApiError = (
  error: any,
  context: {
    endpoint?: string;
    method?: string;
    tags?: Record<string, string>;
  },
) => {
  Sentry.captureException(error, {
    tags: {
      type: "api_error",
      ...context.tags,
    },
    contexts: {
      api: {
        endpoint: context.endpoint,
        method: context.method,
      },
    },
  });
};

/**
 * Capture a custom error/message
 */
export const captureError = (
  message: string,
  context?: Record<string, any>,
) => {
  Sentry.captureException(new Error(message), {
    contexts: {
      custom: context,
    },
  });
};

/**
 * Capture an info message (non-error)
 */
export const captureMessage = (
  message: string,
  level: "info" | "warning" = "info",
) => {
  Sentry.captureMessage(message, level);
};

/**
 * Set user context (optional)
 */
export const setSentryUser = (userId: string, email?: string) => {
  Sentry.setUser({
    id: userId,
    email: email,
  });
};

/**
 * Clear user context
 */
export const clearSentryUser = () => {
  Sentry.setUser(null);
};

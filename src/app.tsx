import "./index.css";
import { AppProvider } from "./provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./pages";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://4b6458701572bd5ec0e00ab17f684e2e@o4510957420937216.ingest.de.sentry.io/4510957428801616",
  sendDefaultPii: true,
  environment: import.meta.env.MODE || "development",
  tracesSampleRate: 1.0, // Capture 100% of transactions for monitoring
  // Capture replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Global error handler for unhandled errors
window.addEventListener("error", (event) => {
  Sentry.captureException(event.error);
});

// Global handler for unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  Sentry.captureException(event.reason);
});

// Create Sentry-wrapped component
const SentryRoutes = Sentry.withErrorBoundary(AppRoutes, {
  fallback: (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Oops! Something went wrong</h1>
      <p>Our team has been notified. Please try refreshing the page.</p>
    </div>
  ),
  showDialog: false,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <SentryRoutes />
    </AppProvider>
  </StrictMode>,
);

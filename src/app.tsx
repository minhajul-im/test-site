import "./index.css";
import { AppProvider } from "./provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./pages";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://4b6458701572bd5ec0e00ab17f684e2e@o4510957420937216.ingest.de.sentry.io/4510957428801616",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </StrictMode>,
);

import axios from "axios";
import { BASE_URL } from "../constant";
import * as Sentry from "@sentry/react";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("token") || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Sentry.captureException(error, {
      tags: { type: "api_request_error" },
    });
    return Promise.reject(error);
  },
);

// Response interceptor to catch API errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorContext: Sentry.CaptureContext = {
      tags: { type: "api_error" },
      contexts: {
        api: {
          endpoint: error?.config?.url,
          method: error?.config?.method?.toUpperCase(),
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          errorMessage: error?.response?.data?.message || error?.message,
        },
      },
      level: error?.response?.status >= 500 ? "error" : "warning",
    };

    // Capture to Sentry with context
    Sentry.captureException(error, errorContext);

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.error("API Error:", {
        url: error?.config?.url,
        method: error?.config?.method,
        status: error?.response?.status,
        data: error?.response?.data,
      });
    }

    return Promise.reject(error);
  },
);

export { apiClient };

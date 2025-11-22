import React from "react";
import "nprogress/nprogress.css";
import { SeoProvider } from "./seo";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { persistor, store } from "../redux/store";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "./config";
import { CookieProvider } from "./cookie";
import { GoogleGtmTracker } from "@/components/common/google-gtm";
import { CookieConsent } from "@/components/common/cookie-consent";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ConfigProvider>
                <CookieProvider>
                  <SeoProvider>
                    <Toaster />
                    <div id="modal" />
                    <GoogleGtmTracker />
                    {children}
                    <CookieConsent />
                  </SeoProvider>
                </CookieProvider>
              </ConfigProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
};

import { useEffect } from "react";
import { useGetConfig } from "@/api/queries/useGetConfig";
import { useGetTranslations } from "@/api/queries/useLanguage";
import { ConfigContext, type ConfigType } from "@/hooks/useConfig";
import { useDispatch } from "react-redux";
import { setTranslations } from "@/redux/slice/translateSlice";
import { getConfig } from "@/helper";
import { updatePrimaryColor, updatePrimaryForeground } from "@/lib/chroma";
import { MaintenancePage } from "@/pages/utils-pages/maintenance";
import { ServerError } from "@/pages/utils-pages/server";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RootPageLoading } from "@/components/layout/root-loading";
import { setLanguages } from "@/redux/slice/languageSlice";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetConfig();
  const {
    data: transData,
    error: translationsError,
    isLoading: isTranslationsLoading,
  } = useGetTranslations();

  useEffect(() => {
    if (!isTranslationsLoading && transData) {
      const translations = transData?.translations || transData?.fallback || {};
      dispatch(setTranslations(translations));
    }
  }, [transData, dispatch, isTranslationsLoading]);

  useEffect(() => {
    if (!isLoading && data) {
      const languages = data?.languages?.data || [];
      dispatch(setLanguages(languages));
    }
  }, [data, dispatch, isLoading]);

  const config = data?.data as ConfigType[];
  const primaryColor = getConfig(config, "base_color")?.value;
  const secondaryColor = getConfig(config, "base_hov_color")?.value;

  useEffect(() => {
    if (primaryColor && typeof primaryColor === "string") {
      updatePrimaryColor(primaryColor);
    }
    if (secondaryColor && typeof secondaryColor === "string") {
      updatePrimaryForeground(secondaryColor);
    }
  }, [primaryColor, secondaryColor]);

  const isMaintenance = getConfig(config, "maintenance_mode")?.value;

  if (isMaintenance === "1") {
    return <MaintenancePage />;
  }

  if (error || translationsError) {
    return <ServerError />;
  }

  if (isLoading) {
    return <RootPageLoading />;
  }

  const clientId = data?.google_client_id || null;

  return (
    <ConfigContext.Provider value={config}>
      {clientId ? (
        <GoogleOAuthProvider clientId={clientId}>
          {children}
        </GoogleOAuthProvider>
      ) : (
        <>{children}</>
      )}
    </ConfigContext.Provider>
  );
};

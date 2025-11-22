import { createContext, useContext } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export interface ConfigType {
  type: string;
  value: string | { type: string; value: string }[];
}

export const ConfigContext = createContext<ConfigType[] | null>(null);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  const { getTranslation } = useTranslation();
  if (context === null) {
    throw new Error(
      getTranslation("server_is_not_responding") || "Server is not responding!"
    );
  }

  return context;
};

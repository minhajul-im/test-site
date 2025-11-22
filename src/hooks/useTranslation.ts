import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";

export const useTranslation = () => {
  const translateState = useSelector((state: RootStateType) => state.translate);

  const getTranslation = (key: string) => {
    if (!translateState?.translations) return null;

    const translation = translateState?.translations?.[key];

    if (!translation) return null;

    return translation;
  };

  const t = new Proxy({} as Record<string, string>, {
    get: (_target, prop: string) => {
      if (typeof prop === "string") {
        return getTranslation(prop);
      }
      return null;
    },
  });

  return {
    t,
    getTranslation,
    translations: translateState?.translations || {},
  };
};

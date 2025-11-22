import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useMemo } from "react";
import { getLangCode } from "@/helper";
import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";

export const LanguageSwitcher = () => {
  const config = useConfig();

  const languages = useSelector(
    (state: RootStateType) => state.language?.languages
  );

  const isShow = getConfig(config, "show_language_switcher")?.value;
  const [currentLanguage, setCurrentLanguage] = useState<string>("");

  useEffect(() => {
    if (languages?.length > 0) {
      const storedLanguage = getLangCode();
      if (storedLanguage) {
        setCurrentLanguage(storedLanguage);
      } else {
        const defaultLang = languages?.find((lang) => lang.is_default);
        if (defaultLang) {
          setCurrentLanguage(defaultLang?.code);
          localStorage.setItem("code", defaultLang?.code);
        }
      }
    }
  }, [languages]);

  const handleChangeLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem("code", code);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const currentLang = useMemo(
    () => languages?.find((lang) => lang?.code === currentLanguage),
    [languages, currentLanguage]
  );

  if (!isShow || !currentLang) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <button
          type="button"
          className="flex select-none h-8 w-8 items-center justify-center cursor-pointer overflow-hidden relative border-none">
          {currentLang?.image ? (
            <img
              src={currentLang?.image}
              alt={currentLang?.name}
              style={{ height: "46%" }}
              className="w-full object-contain absolute"
            />
          ) : (
            <div className="flex items-center w-full h-full justify-center rounded-full border">
              <span className="text-base font-medium uppercase">
                {currentLang?.code || getLangCode()}
              </span>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-32">
        {languages?.map((language) => (
          <DropdownMenuItem
            key={language.id}
            onClick={() => handleChangeLanguage(language?.code)}
            className="cursor-pointer">
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-2">
                <img
                  src={language?.image}
                  alt={language?.name}
                  className="w-6 object-contain"
                  style={{ height: "46%" }}
                />
                <span className="text-sm font-medium">{language?.name}</span>
              </div>
              {currentLanguage === language?.code && (
                <span className="text-green-600 font-bold">✓</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

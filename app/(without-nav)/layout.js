"use client";

import I18nProvider from "@/providers/I18nProvider";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const WithOutNavLayout = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
      if (typeof window !== "undefined") {
        const defaultLocal = JSON.parse(localStorage.getItem("lang"));
        if (defaultLocal) {
          i18n.changeLanguage(defaultLocal.lang.toLowerCase());
        } else {
          i18n.changeLanguage("en"); // Fallback language if none is set in localStorage
        }
      }
    }, [i18n]);

  return (
    <div>
      <I18nProvider>{children}</I18nProvider>
    </div>
  );
};

export default WithOutNavLayout;

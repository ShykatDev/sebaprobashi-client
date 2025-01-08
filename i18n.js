import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import nextI18NextConfig from "./next-i18next.config.js";

import en from "./public/locales/en/common.json"
import bn from "./public/locales/bn/common.json"
import sa from "./public/locales/sa/common.json"

const resources = {
    en: {
      common: en,
    },
    bn: {
      common: bn,
    },
    sa: {
      common: sa,
    },
  };

i18n.use(initReactI18next).init({
  ...nextI18NextConfig.i18n,
  fallbackLng: "en",
  ns: ["common"],
  interpolation: {
    escapeValue: false,
  },
  resources,
  react: {
    bindI18n: "languageChanged editorSaved",
  },
});

export default i18n;

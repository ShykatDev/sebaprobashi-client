"use client";

import { appWithTranslation } from "next-i18next";
import i18n from "../i18n"; // Ensure i18n is imported to initialize it

const I18nProvider = ({ children }) => {
  return children;
};

export default appWithTranslation(I18nProvider);

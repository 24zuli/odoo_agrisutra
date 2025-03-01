"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import gu from "./gu.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      gu: { translation: gu },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;

"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define a helper to load all locales from the current directory
const loadResources = () => {
  const context = (require as any).context("./", false, /\.json$/);
  const resources: any = {};

  context.keys().forEach((key: string) => {
    const locale = key.replace("./", "").replace(".json", "");
    resources[locale] = {
      translation: context(key),
    };
  });

  return resources;
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: loadResources(),
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;

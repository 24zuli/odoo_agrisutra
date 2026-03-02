"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// 1. Import the translation hook and the configured i18n instance
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";

export default function LanguageSelectionPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");

  // 2. Initialize the translation hook using our config
  const { t } = useTranslation();

  // Load the saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setLanguage(savedLang);
  }, []);

  // Update localStorage and then reload or navigate
  const handleSelectLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    setLanguage(lang);
    // 4. Update the i18n instance immediately
    i18n.changeLanguage(lang);
    // Force a page reload so the Navbar (which handles i18n) picks up the new language
    window.location.reload();
  };

  // If you want a "Done" button that just goes back:
  const handleDone = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="text-black hover:text-gray-900 focus:outline-none mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          {/* 3. Use translated string for "Select Language" */}
          <h1 className="text-xl font-bold text-black">
            {t("languagePage.selectLanguage")}
          </h1>
        </div>
      </div>

      {/* Language List */}
      <ul className="mt-2 bg-white">
        {i18n.options.resources &&
          Object.keys(i18n.options.resources).map((lang) => {
            const langNames: Record<string, string> = {
              en: "English",
              gu: "Gujarati",
              hi: "Hindi",
              mr: "Marathi",
              ta: "Tamil",
              te: "Telugu",
              kn: "Kannada",
              ml: "Malayalam",
              bn: "Bengali",
              pa: "Punjabi",
            };
            return (
              <li
                key={lang}
                className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSelectLanguage(lang)}
              >
                <span>{langNames[lang] || lang.toUpperCase()}</span>
                {language === lang && (
                  <span className="text-green-600 font-semibold">&#10003;</span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

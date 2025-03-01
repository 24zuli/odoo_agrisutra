"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// 1. Import the translation hook
import { useTranslation } from "react-i18next";

export default function LanguageSelectionPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");

  // 2. Initialize the translation hook
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
    // Force a page reload so the Navbar (which handles i18n) picks up the new language
    window.location.reload();
    // OR, if you prefer, just go back:
    // router.back();
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
        {/* English */}
        <li
          className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={() => handleSelectLanguage("en")}
        >
          {/* 4. Replace "English" with translation */}
          <span>{t("languagePage.english")}</span>
          {language === "en" && (
            <span className="text-green-600 font-semibold">&#10003;</span>
          )}
        </li>

        {/* Gujarati */}
        <li
          className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={() => handleSelectLanguage("gu")}
        >
          {/* 5. Replace "ગુજરાતી" with translation */}
          <span>{t("languagePage.gujarati")}</span>
          {language === "gu" && (
            <span className="text-green-600 font-semibold">&#10003;</span>
          )}
        </li>
      </ul>
    </div>
  );
}

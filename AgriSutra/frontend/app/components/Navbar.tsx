"use client";

import { useState, useEffect } from "react";
import { Menu, Bell, Bookmark, Save, Trash2, Globe } from "lucide-react";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import i18n from "@/app/locales/i18n";

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [savedSchemes, setSavedSchemes] = useState<any[]>([]);
  const { t } = useTranslation();

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

  useEffect(() => {
    const storedSchemes = JSON.parse(
      localStorage.getItem("savedSchemes") || "[]",
    );
    setSavedSchemes(storedSchemes);
  }, []);

  // Remove a scheme from saved list
  const handleRemoveScheme = (id: string) => {
    const updatedSchemes = savedSchemes.filter((scheme) => scheme.id !== id);
    setSavedSchemes(updatedSchemes);
    localStorage.setItem("savedSchemes", JSON.stringify(updatedSchemes));
  };

  // Switch Language
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
              {!isSidebarOpen && (
                <div className="ml-3 flex items-center">
                  <span className="text-xl font-bold text-green-600">
                    AgriSutra
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>

              {/* Save Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                >
                  <Bookmark className="h-6 w-6" />
                </button>

                {/* Dropdown for Saved Schemes */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-[60] border border-gray-100">
                    <div className="p-3 bg-green-500 text-white font-semibold flex items-center">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Saved Schemes
                    </div>
                    {savedSchemes.length === 0 ? (
                      <p className="p-3 text-gray-500 text-sm">
                        No saved schemes
                      </p>
                    ) : (
                      <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                        {savedSchemes.map((scheme) => (
                          <li
                            key={scheme.id}
                            className="p-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                          >
                            <a
                              href={`/schemes/${scheme.id}`}
                              className="text-green-700 hover:underline text-sm truncate pr-2"
                            >
                              {scheme.name}
                            </a>
                            <button
                              onClick={() => handleRemoveScheme(scheme.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}
                  className={`flex items-center space-x-1 p-2 rounded-md transition-all duration-200 ${
                    isLangDropdownOpen
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  title="Change Language"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase hidden sm:block">
                    {i18n.language}
                  </span>
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden z-[60] border border-gray-100 animate-in fade-in zoom-in duration-200">
                    <div className="p-2 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 px-2 mt-1">
                        Select Language
                      </p>
                    </div>
                    <div className="p-1">
                      {i18n.options.resources &&
                        Object.keys(i18n.options.resources).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => changeLanguage(lang)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                              i18n.language === lang
                                ? "bg-green-100 text-green-700 font-bold"
                                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                            }`}
                          >
                            <span>{langNames[lang] || lang.toUpperCase()}</span>
                            {i18n.language === lang && (
                              <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

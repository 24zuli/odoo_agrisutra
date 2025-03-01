"use client";

import { useState } from "react";
import { Menu, Bell, Bookmark } from "lucide-react";
import Sidebar from "./Sidebar";
// Import the translation hook and the configured i18n instance
import { useTranslation } from "react-i18next";
import i18n from "@/app/locales/i18n";

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  // Use the imported i18n instance for language switching
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
                <Bookmark className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              {/* Language switcher buttons */}
              <button
                onClick={() => changeLanguage("en")}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("gu")}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                GU
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

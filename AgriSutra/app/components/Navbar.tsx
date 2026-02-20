// "use client";

// import { useState } from "react";
// import { Menu, Bell, Bookmark } from "lucide-react";
// import Sidebar from "./Sidebar";
// // Import the translation hook and the configured i18n instance
// import { useTranslation } from "react-i18next";
// import i18n from "@/app/locales/i18n";

// export default function Navbar() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const { t } = useTranslation();

//   // Use the imported i18n instance for language switching
//   const changeLanguage = (lang: string) => {
//     i18n.changeLanguage(lang);
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
//                 <Bookmark className="h-6 w-6" />
//               </button>
//               <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
//                 <Bell className="h-6 w-6" />
//               </button>
//               {/* Language switcher buttons */}
//               <button
//                 onClick={() => changeLanguage("en")}
//                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
//               >
//                 EN
//               </button>
//               <button
//                 onClick={() => changeLanguage("gu")}
//                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
//               >
//                 GU
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Menu, Bell, Bookmark, Save, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import i18n from "@/app/locales/i18n";

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [savedSchemes, setSavedSchemes] = useState<any[]>([]);
  const { t } = useTranslation();

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
              {!isSidebarOpen && (
                <div className="ml-3 flex items-center">
                  <span className="text-xl font-bold text-green-600">
                    AgriSutra
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
                <Bookmark className="h-6 w-6" />
              </button> */}
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
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-10">
                    <div className="p-3 bg-green-500 text-white font-semibold">
                      Saved Schemes
                    </div>
                    {savedSchemes.length === 0 ? (
                      <p className="p-3 text-gray-500">No saved schemes</p>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {savedSchemes.map((scheme) => (
                          <li
                            key={scheme.id}
                            className="p-3 flex justify-between items-center hover:bg-gray-100"
                          >
                            <a
                              href={`/schemes/${scheme.id}`}
                              className="text-green-700 hover:underline"
                            >
                              {scheme.name}
                            </a>
                            <button
                              onClick={() => handleRemoveScheme(scheme.id)}
                              className="text-red-500"
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

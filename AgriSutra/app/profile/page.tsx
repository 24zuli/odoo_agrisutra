"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setUserId } from "../../lib/auth";
import {
  User2,
  History,
  MapPin,
  Globe,
  HelpCircle,
  Star,
  Info,
  LogOut,
  ArrowLeft,
} from "lucide-react";

// 1. Import the translation hook
import { useTranslation } from "react-i18next";

export default function ProfileHomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{
    name: string;
    phone_number: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Initialize the translation hook
  const { t } = useTranslation();

  // Logout handler
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
    console.log("✅ User logged out successfully");
    router.push("/login");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      console.error("❌ No userId found in storage");
      setLoading(false);
      return;
    }

    setUserId(storedUserId);

    async function fetchProfile() {
      try {
        console.log("🔹 Fetching profile for user ID:", storedUserId);
        const res = await fetch(
          `http://localhost:3001/api/profile?userId=${storedUserId}`
        );

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        // Provide default values if missing
        if (!data.id) data.id = "Unknown ID";
        if (!data.name) data.name = "Unknown User";

        setProfile(data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {loading ? (
        // 3. Use translated "Loading..."
        <div className="p-4">{t("profilePage.loading")}</div>
      ) : profile ? (
        <>
          {/* Top Section: "Profile" Heading and User Info */}
          <div className="bg-white p-4 shadow-sm">
            <div className="mt-4">
              <h1 className="text-lg font-bold">{profile.name}</h1>
              <p className="text-gray-500">{profile.phone_number || "N/A"}</p>
            </div>
          </div>

          {/* Navigation List */}
          <ul className="mt-4 divide-y divide-gray-200 bg-white">
            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/edit")}
            >
              <User2 className="h-5 w-5 mr-3 text-gray-600" />
              {/* 4. Translate "Edit Profile" */}
              <span className="flex-grow">{t("profilePage.editProfile")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => console.log("Equipment History")}
            >
              <History className="h-5 w-5 mr-3 text-gray-600" />
              {/* 5. Translate "Equipment History" */}
              <span className="flex-grow">
                {t("profilePage.equipmentHistory")}
              </span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => console.log("Track Equipment")}
            >
              <MapPin className="h-5 w-5 mr-3 text-gray-600" />
              {/* 6. Translate "Track Equipment" */}
              <span className="flex-grow">
                {t("profilePage.trackEquipment")}
              </span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/language")}
            >
              <Globe className="h-5 w-5 mr-3 text-gray-600" />
              {/* 7. Translate "Language Selection" */}
              <span className="flex-grow">
                {t("profilePage.languageSelection")}
              </span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/support")}
            >
              <HelpCircle className="h-5 w-5 mr-3 text-gray-600" />
              {/* 8. Translate "Help & Support" */}
              <span className="flex-grow">{t("profilePage.helpSupport")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/rate")}
            >
              <Star className="h-5 w-5 mr-3 text-gray-600" />
              {/* 9. Translate "Rate Us" */}
              <span className="flex-grow">{t("profilePage.rateUs")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("profile/about")}
            >
              <Info className="h-5 w-5 mr-3 text-gray-600" />
              {/* 10. Translate "About Us" */}
              <span className="flex-grow">{t("profilePage.aboutUs")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer text-red-600 hover:bg-gray-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {/* 11. Translate "Logout" */}
              <span className="flex-grow">{t("profilePage.logout")}</span>
            </li>
          </ul>
        </>
      ) : (
        // 12. Translate "Error loading profile."
        <div className="p-4">{t("profilePage.errorLoadingProfile")}</div>
      )}
    </div>
  );
}

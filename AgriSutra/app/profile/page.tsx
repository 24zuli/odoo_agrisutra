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
import { useTranslation } from "react-i18next";

interface ProfileData {
  name: string;
  phone_number: string;
}

export default function ProfileHomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

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
          `https://backend-agrisutra.onrender.com/api/profile?userId=${storedUserId}`
        );

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        // Provide default values if missing
        if (!data.name) data.name = "Unknown User";
        if (!data.phone_number) data.phone_number = "N/A";

        setProfile(data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Helper to get first letter of the user name
  const getFirstLetter = (name: string) =>
    name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-gray-100">
      {loading ? (
        <div className="p-4">{t("profilePage.loading")}</div>
      ) : profile ? (
        <>
          {/* Top Header: Arrow & "Profile" */}
          <div className="bg-white p-4 shadow-sm flex items-center">
            <button
              onClick={() => router.push("/")}
              className="text-black hover:text-gray-900 focus:outline-none mr-3"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-black">
              {t("profilePage.profileHeading")}
            </h1>
          </div>

          {/* User Info Section */}
          <div className="bg-white p-4 shadow-sm mt-2 flex items-center">
            {/* Avatar Circle */}
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
              <span className="text-white font-bold">
                {getFirstLetter(profile.name)}
              </span>
            </div>
            {/* Name & Phone */}
            <div>
              <p className="text-lg font-bold">{profile.name}</p>
              <p className="text-gray-500 text-sm">
                {profile.phone_number || "N/A"}
              </p>
            </div>
          </div>

          {/* Navigation List */}
          <ul className="mt-4 divide-y divide-gray-200 bg-white">
            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/edit")}
            >
              <User2 className="h-5 w-5 mr-3 text-gray-600" />
              <span className="flex-grow">{t("profilePage.editProfile")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => console.log("Equipment History")}
            >
              <History className="h-5 w-5 mr-3 text-gray-600" />
              <span className="flex-grow">
                {t("profilePage.equipmentHistory")}
              </span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => console.log("Track Equipment")}
            >
              <MapPin className="h-5 w-5 mr-3 text-gray-600" />
              <span className="flex-grow">
                {t("profilePage.trackEquipment")}
              </span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/language")}
            >
              <Globe className="h-5 w-5 mr-3 text-gray-600" />
              <span className="flex-grow">
                {t("profilePage.languageSelection")}
              </span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/support")}
            >
              <HelpCircle className="h-5 w-5 mr-3 text-gray-600" />
              <span className="flex-grow">{t("profilePage.helpSupport")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/profile/rate")}
            >
              <Star className="h-5 w-5 mr-3 text-gray-600" />
              <span className="flex-grow">{t("profilePage.rateUs")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("profile/about")}
            >
              <Info className="h-5 w-5 mr-3 text-gray-600" />
              <span className="flex-grow">{t("profilePage.aboutUs")}</span>
            </li>

            <li
              className="flex items-center p-4 cursor-pointer text-red-600 hover:bg-gray-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="flex-grow">{t("profilePage.logout")}</span>
            </li>
          </ul>
        </>
      ) : (
        <div className="p-4">{t("profilePage.errorLoadingProfile")}</div>
      )}
    </div>
  );
}

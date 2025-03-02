"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile, ProfileData } from "@/lib/profile";
import { useTranslation } from "react-i18next";

export default function ProfileHomePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); // ✅ Add translation hook

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-4">{t("settings.loading")}</div>;
  if (!profile)
    return <div className="p-4">{t("settings.errorLoadingProfile")}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="mt-4">
          <h1 className="text-lg font-bold">{profile.name}</h1>
          <p className="text-gray-500">{profile.phone_number}</p>
        </div>
      </div>

      {/* Navigation List */}
      <ul className="mt-4 divide-y divide-gray-200 bg-white">
        <li className="p-4 hover:bg-gray-50">
          <Link href="/profile/edit" className="flex items-center">
            {t("settings.editProfile")}
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-50">
          <Link href="/profile/language" className="flex items-center">
            {t("settings.languageSelection")}
          </Link>
        </li>
        <li className="p-4 hover:bg-gray-50">
          <Link href="/settings" className="flex items-center">
            {t("settings.settings")}
          </Link>
        </li>
      </ul>
    </div>
  );
}

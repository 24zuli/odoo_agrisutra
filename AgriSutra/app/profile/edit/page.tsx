"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile, ProfileData } from "@/lib/profile";
import { ArrowLeft } from "lucide-react";

// 1. Import the translation hook
import { useTranslation } from "react-i18next";

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 2. Initialize translation
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    // 3. Replace "Loading..." with translation
    return <div className="p-4">{t("editProfilePage.loading")}</div>;
  }
  if (!profile) {
    // 4. Replace "Error loading profile." with translation
    return (
      <div className="p-4">{t("editProfilePage.errorLoadingProfile")}</div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      router.push("/profile");
    } catch (err: any) {
      // 5. Replace fallback text with translation key
      setError(err.message || t("editProfilePage.failedToUpdateProfile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Save button */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="text-black hover:text-gray-900 focus:outline-none mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          {/* 6. Replace "Edit Profile" with translation */}
          <h1 className="text-xl font-bold text-black">
            {t("editProfilePage.editProfile")}
          </h1>
        </div>
        <button
          onClick={handleSave}
          className="text-blue-600 hover:text-blue-800 font-semibold"
          disabled={saving}
        >
          {/* 7. Replace "Saving..." and "Save" with translation */}
          {saving ? t("editProfilePage.saving") : t("editProfilePage.save")}
        </button>
      </div>

      {/* Form */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.nameLabel")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value } as ProfileData)
              }
            />
          </div>

          {/* Username */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.usernameLabel")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.username}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                } as ProfileData)
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.emailLabel")}
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value } as ProfileData)
              }
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.genderLabel")}
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.gender || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  gender: e.target.value,
                } as ProfileData)
              }
            >
              <option value="">{t("editProfilePage.selectGender")}</option>
              <option value="Male">{t("editProfilePage.male")}</option>
              <option value="Female">{t("editProfilePage.female")}</option>
              <option value="Other">{t("editProfilePage.other")}</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.dateOfBirth")}
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={
                profile.date_of_birth ? profile.date_of_birth.slice(0, 10) : ""
              }
              onChange={(e) =>
                setProfile({
                  ...profile,
                  date_of_birth: e.target.value,
                } as ProfileData)
              }
            />
          </div>

          {/* State */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.state")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.state}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  state: e.target.value,
                } as ProfileData)
              }
            />
          </div>

          {/* District */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.district")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.district}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  district: e.target.value,
                } as ProfileData)
              }
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.phoneNumberLabel")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.phone_number}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone_number: e.target.value,
                } as ProfileData)
              }
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

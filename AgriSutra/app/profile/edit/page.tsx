"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile, ProfileData } from "@/lib/profile";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
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

  if (loading) return <div className="p-4">{t("editProfilePage.loading")}</div>;
  if (!profile)
    return (
      <div className="p-4">{t("editProfilePage.errorLoadingProfile")}</div>
    );

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      // Exclude read-only fields before sending update request
      const {
        username,
        email,
        profile_completed,
        created_at,
        updated_at,
        ...updatableFields
      } = profile;

      const updated = await updateProfile(updatableFields);
      setProfile(updated);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || t("editProfilePage.failedToUpdateProfile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.push("/profile")}
            className="text-black hover:text-gray-900 focus:outline-none mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-black">
            {t("editProfilePage.editProfile")}
          </h1>
        </div>
        <button
          onClick={handleSave}
          className="text-blue-600 hover:text-blue-800 font-semibold"
          disabled={saving}
        >
          {saving ? t("editProfilePage.saving") : t("editProfilePage.save")}
        </button>
      </div>

      {/* Profile Form */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          {/* Read-only username */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.usernameLabel")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              value={profile.username || ""}
              readOnly
            />
          </div>

          {/* Read-only email */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.emailLabel")}
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              value={profile.email || ""}
              readOnly
            />
          </div>

          {/* Editable fields */}
          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.nameLabel")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value } as ProfileData)
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.phoneNumberLabel")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.phone_number || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone_number: e.target.value,
                } as ProfileData)
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.state")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.state || ""}
              onChange={(e) =>
                setProfile({ ...profile, state: e.target.value } as ProfileData)
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              {t("editProfilePage.district")}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.district || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  district: e.target.value,
                } as ProfileData)
              }
            />
          </div>

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

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

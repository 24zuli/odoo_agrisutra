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
      const updated = await updateProfile(profile);
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
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
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

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          {[
            { label: "nameLabel", key: "name", type: "text" },
            { label: "usernameLabel", key: "username", type: "text" },
            { label: "emailLabel", key: "email", type: "email" },
            { label: "state", key: "state", type: "text" },
            { label: "district", key: "district", type: "text" },
            { label: "phoneNumberLabel", key: "phone_number", type: "text" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block font-semibold mb-1">
                {t(`editProfilePage.${label}`)}
              </label>
              <input
                type={type}
                className="w-full border border-gray-300 rounded-lg p-2"
                // value={profile?.[key] || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    [key]: e.target.value,
                  } as ProfileData)
                }
              />
            </div>
          ))}

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

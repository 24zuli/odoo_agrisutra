"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile, ProfileData } from "@/lib/profile";

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  if (loading) return <div className="p-4">Loading...</div>;
  if (!profile) return <div className="p-4">Error loading profile.</div>;

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Save button */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <h1 className="text-lg font-bold">Edit Profile</h1>
        <button
          onClick={handleSave}
          className="text-blue-600 hover:text-blue-800 font-semibold"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Form */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value } as ProfileData)
              }
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Username *</label>
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
          <div>
            <label className="block font-semibold mb-1">Email *</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value } as ProfileData)
              }
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Gender</label>
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
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Date of Birth</label>
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
          <div>
            <label className="block font-semibold mb-1">State</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={profile.state}
              onChange={(e) =>
                setProfile({ ...profile, state: e.target.value } as ProfileData)
              }
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">District</label>
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
          <div>
            <label className="block font-semibold mb-1">Phone Number *</label>
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
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

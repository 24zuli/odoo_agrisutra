"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, ProfileData } from "../../lib/profile";
import {
  User2,
  History,
  MapPin,
  Settings,
  Globe,
  HelpCircle,
  Star,
  Info,
  LogOut,
} from "lucide-react";

export default function ProfileHomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
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

  // Example logout handler (adjust your logout logic as needed)
  const handleLogout = () => {
    // Clear auth tokens or any stored user data
    router.push("/login");
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (!profile) {
    return <div className="p-4">Error loading profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Section: "Profile" Heading and User Info */}
      <div className="bg-white p-4 shadow-sm">
        <div className="mt-4">
          <h1 className="text-lg font-bold">{profile.name}</h1>
          <p className="text-gray-500">{profile.phone_number}</p>
        </div>
      </div>

      {/* Navigation List */}
      <ul className="mt-4 divide-y divide-gray-200 bg-white">
        <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => router.push("/profile/edit")}
        >
          <User2 className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">Edit Profile</span>
        </li>

        <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => console.log("Equipment History")}
        >
          <History className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">Equipment History</span>
        </li>

        <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => console.log("Track Equipment")}
        >
          <MapPin className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">Track Equipment</span>
        </li>

        {/* <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => router.push("settings")}
        >
          <Settings className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">Settings</span>
        </li> */}

        <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => router.push("/profile/language")}
        >
          <Globe className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">Language Selection</span>
        </li>

        <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => router.push("/profile/support")}
        >
          <HelpCircle className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">Help & Support</span>
        </li>

        <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => router.push("/profile/rate")}
        >
          <Star className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">Rate Us</span>
        </li>

        <li
          className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => router.push("profile/about")}
        >
          <Info className="h-5 w-5 mr-3 text-gray-600" />
          <span className="flex-grow">About Us</span>
        </li>

        <li
          className="flex items-center p-4 cursor-pointer text-red-600 hover:bg-gray-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="flex-grow">Logout</span>
        </li>
      </ul>
    </div>
  );
}

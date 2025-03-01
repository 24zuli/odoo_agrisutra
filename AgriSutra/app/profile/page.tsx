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

export default function ProfileHomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{
    name: string;
    phone_number: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");  // ✅ Remove JWT token
      localStorage.removeItem("userId"); // ✅ Remove user ID
    }

    console.log("✅ User logged out successfully");

    // ✅ Redirect to login page
    router.push("/login");
  }

  // useEffect(() => {
  //   async function fetchProfile() {
  //     try {
  //       const id = localStorage.getItem("userId");

  //       if (!id) {
  //         console.error("❌ No userId found in localStorage");
  //         return;
  //       }

  //       console.log("🔹 Fetching profile for user ID:", id);

  //       const res = await fetch(
  //         `http://localhost:3001/api/profile?userId=${id}`
  //       );
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch profile");
  //       }

  //       const data = await res.json();
  //       setProfile(data);
  //     } catch (error) {
  //       console.error("❌ Error fetching profile:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchProfile();
  // }, []);

useEffect(() => {
  const storedUserId = localStorage.getItem("userId");

  if (!storedUserId) {
    console.error("❌ No userId found in storage");
    setLoading(false); // Stop loading if userId is missing
    return;
  }

  setUserId(storedUserId);

  //   async function fetchProfile() {
  //     try {
  //       console.log("🔹 Fetching profile for user ID:", storedUserId);
  //       const res = await fetch(
  //         `http://localhost:3001/api/profile?userId=${storedUserId}`
  //       );

  //       if (!res.ok) throw new Error("Failed to fetch profile");

  //       const data = await res.json();

  //       // ✅ Ensure the data contains required fields
  //       if (!data.name || !data.phone_number) {
  //         throw new Error("Invalid profile data");
  //       }

  //       setProfile(data);
  //     } catch (error) {
  //       console.error("❌ Error fetching profile:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchProfile();
  // }, []);

  async function fetchProfile() {
    try {
      console.log("🔹 Fetching profile for user ID:", storedUserId);
      const res = await fetch(
        `http://localhost:3001/api/profile?userId=${storedUserId}`
      );

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();

      // ✅ Provide default values if missing
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
    {/* Show loading state */}
    {loading ? (
      <div className="p-4">Loading...</div>
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
      </>
    ) : (
      <div className="p-4">Error loading profile.</div>
    )}
  </div>
);
}
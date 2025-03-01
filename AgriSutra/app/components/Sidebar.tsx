"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Settings, HelpCircle, LogOut, Sprout } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  name: string;
  username: string;
  email: string;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // ✅ Load user from localStorage for instant display
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // ✅ Fetch latest user data from API
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          "http://localhost:3001/api/auth/userProfile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // ✅ Keep it updated
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
      }
    };

    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ Clear user details on logout
    router.push("/login");
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        {/* 🔹 Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-green-800">
              AgriSutra
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* 🔹 User Profile Section */}
        {user ? (
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-xl text-white font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg">
                  {user.username}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}

        {/* 🔹 Navigation Links */}
        <nav className="space-y-2">
          <Link
            href="/schemes"
            className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-md transition"
          >
            <span className="text-md font-medium">Know Your Schemes</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-md transition"
          >
            <Settings className="h-5 w-5 text-gray-600" />
            <span className="text-md font-medium">Settings</span>
          </Link>
          <Link
            href="/profile/support"
            className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-md transition"
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
            <span className="text-md font-medium">Support</span>
          </Link>

          {/* 🔹 Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-md w-full text-left transition"
          >
            <LogOut className="h-5 w-5 text-red-600" />
            <span className="text-md font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

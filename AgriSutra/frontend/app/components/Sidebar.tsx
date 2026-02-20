"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  X,
  Settings,
  HelpCircle,
  LogOut,
  Sprout,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

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
  const [width, setWidth] = useState(256); // Default 64 (w-64 = 16rem = 256px)
  const [isResizing, setIsResizing] = useState(false);

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
          "https://backend-agrisutra.onrender.com/api/auth/userProfile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
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

  const getInitials = (name: string, username: string) => {
    const target = name || username || "User";
    const parts = target.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return target.substring(0, 2).toUpperCase();
  };

  // Draggable Resize Logic
  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const stopResizing = () => setIsResizing(false);
    const resize = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= 80 && newWidth <= 400) {
          setWidth(newWidth);
        }
      }
    };

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  const isMinimized = width < 120;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: `${width}px`, transition: isResizing ? "none" : "" }}
    >
      <div className="p-4 flex flex-col h-full overflow-hidden flex-grow">
        {/* 🔹 Sidebar Header */}
        <div
          className={`flex items-center mb-6 ${isMinimized ? "justify-center" : "justify-between"}`}
        >
          {!isMinimized && (
            <div className="flex items-center flex-shrink-0">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800 truncate">
                AgriSutra
              </span>
            </div>
          )}
          {isMinimized && (
            <Sprout className="h-8 w-8 text-green-600 flex-shrink-0" />
          )}

          <button
            onClick={onClose}
            className={`p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none ${isMinimized ? "hidden" : ""}`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* 🔹 User Profile Section */}
        {user ? (
          <Link
            href="/profile"
            className={`mb-6 block group transition-all duration-200 ${isMinimized ? "flex justify-center" : "p-2 hover:bg-green-50 rounded-lg"}`}
            title={user.username}
          >
            <div
              className={`flex items-center ${isMinimized ? "" : "space-x-4"}`}
            >
              <div className="flex-shrink-0 h-11 w-11 rounded-full bg-green-600 flex items-center justify-center border-2 border-green-700 transition-transform group-hover:scale-105">
                <span className="text-lg text-white font-bold tracking-wider">
                  {getInitials(user.name, user.username)}
                </span>
              </div>
              {!isMinimized && (
                <div className="overflow-hidden">
                  <div className="font-bold text-gray-900 text-base truncate group-hover:text-green-700">
                    {user.name || user.username}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user.email}
                  </div>
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className={`mb-6 ${isMinimized ? "flex justify-center" : ""}`}>
            <div className="h-11 w-11 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          </div>
        )}

        {/* 🔹 Navigation Links */}
        <nav className="space-y-2 flex-grow overflow-y-auto no-scrollbar">
          <Link
            href="/schemes"
            title="Know Your Schemes"
            className={`flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-md transition ${isMinimized ? "justify-center px-0" : ""}`}
          >
            <div className="w-6 flex justify-center flex-shrink-0">
              <span className="text-xl">📜</span>
            </div>
            {!isMinimized && (
              <span className="text-md font-medium truncate">
                Know Your Schemes
              </span>
            )}
          </Link>
          <Link
            href="/settings"
            title="Settings"
            className={`flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-md transition ${isMinimized ? "justify-center px-0" : ""}`}
          >
            <div className="w-6 flex justify-center flex-shrink-0">
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
            {!isMinimized && (
              <span className="text-md font-medium truncate">Settings</span>
            )}
          </Link>
          <Link
            href="/profile/support"
            title="Support"
            className={`flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-md transition ${isMinimized ? "justify-center px-0" : ""}`}
          >
            <div className="w-6 flex justify-center flex-shrink-0">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </div>
            {!isMinimized && (
              <span className="text-md font-medium truncate">Support</span>
            )}
          </Link>
        </nav>

        {/* 🔹 Logout Button */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleLogout}
            title="Logout"
            className={`flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-md w-full text-left transition ${isMinimized ? "justify-center px-0" : ""}`}
          >
            <div className="w-6 flex justify-center flex-shrink-0">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            {!isMinimized && (
              <span className="text-md font-medium truncate">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* 🔹 Resize Handle */}
      <div
        onMouseDown={startResizing}
        className="w-1 cursor-col-resize bg-gray-100 hover:bg-green-400 transition-colors"
      />
    </div>
  );
}

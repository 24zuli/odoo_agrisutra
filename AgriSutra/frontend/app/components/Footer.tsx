"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Newspaper, Cloud, User } from "lucide-react";

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  // Function to get user's location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Save location in session storage to use in Weather Page
        sessionStorage.setItem("userLat", latitude.toString());
        sessionStorage.setItem("userLon", longitude.toString());

        // Navigate to the weather page
        router.push("/weather");
      },
      (error) => {
        alert("Location access denied. Please allow location access.");
        console.error("Error getting location:", error);
      }
    );
  };

  return (
    <>
      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-3">
            <Link
              href="/"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              href="/news"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <Newspaper className="h-6 w-6" />
              <span className="text-xs mt-1">News</span>
            </Link>
            <button
              onClick={() => setShowPopup(true)}
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <Cloud className="h-6 w-6" />
              <span className="text-xs mt-1">Weather</span>
            </button>
            <Link
              href="/profile"
              className="flex flex-col items-center text-gray-600 hover:text-green-600"
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Popup Modal for Location Permission */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-lg font-semibold">Allow Location Access?</p>
            <p className="text-sm text-gray-600">
              We need your location to show accurate weather updates
            </p>
            <div className="mt-4 flex justify-around">
              <button
                onClick={() => {
                  setShowPopup(false);
                  getLocation();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Allow
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

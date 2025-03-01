"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Tractor, CloudRain, Sprout } from "lucide-react";
import { isAuthenticated } from "../lib/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const getUserIdFromToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error(" No token found in localStorage.");
        return null;
      }

      try {
        const base64Url = token.split(".")[1]; // Extract payload part of JWT
        if (!base64Url) {
          console.error(" Invalid token format.");
          return null;
        }

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedToken = JSON.parse(atob(base64));

        if (!decodedToken.id) {
          console.error(" User ID missing in token.");
          return null;
        }

        console.log(" User ID from Token:", decodedToken.id);
        return decodedToken.id;
      } catch (error) {
        console.error(" Error decoding token:", error);
        return null;
      }
    }

    console.error(" Window object not found (server-side).");
    return null;
  };

  const userId = getUserIdFromToken();

  // Function to fetch and store location in the database
  const getLocationAndStore = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const token = localStorage.getItem("token"); // Fetch token
          if (!token) {
            console.error(" No auth token found. User might be logged out.");
            router.push("/equipment");
            return;
          }

          const userId = getUserIdFromToken();
          if (!userId) {
            console.error(" User ID not found, skipping location update.");
            router.push("/equipment");
            return;
          }

          try {
            const response = await fetch(
              `http://localhost:3001/api/users/update-location/${userId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Ensure token is sent
                },
                body: JSON.stringify({
                  location_lat: lat,
                  location_lng: lng,
                }),
              }
            );

            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || "Failed to update location");
            }
            console.log(" Location updated successfully:", data);
          } catch (error) {
            console.error(" Error updating location:", error);
          }

          router.push("/equipment");
        },
        (error) => {
          console.error(" Error getting location:", error);
          router.push("/equipment");
        }
      );
    } else {
      console.error(" Geolocation is not supported by this browser.");
      router.push("/equipment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <section className="relative h-64 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Farming landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Cultivate Success</h1>
              <p className="text-lg">
                "The farmer is the only man in our economy who buys everything
                at retail, sells everything at wholesale, and pays the freight
                both ways."
              </p>
            </div>
          </div>
        </section>

        {/* Government Schemes */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Government Schemes
          </h2>
          <p className="text-gray-600 mb-4">
            Discover various agricultural schemes and subsidies provided by the
            government to support farmers.
          </p>
          <button
            onClick={() => router.push("/schemes")}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            Explore Schemes
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </section>

        {/* Market Trends */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Market Trends
          </h2>
          <p className="text-gray-600 mb-4">
            Stay updated with the real time market prices and agricultural
            commodity trends.
          </p>
          <button
            onClick={() => router.push("/market")}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            View All Trends
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Equipment Services
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <Tractor className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">Tractor Booking</h3>
              <p className="text-sm text-gray-600">
                Book tractors for your farming needs
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <CloudRain className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">Irrigation Equipment</h3>
              <p className="text-sm text-gray-600">
                Modern irrigation solutions
              </p>
            </div>
          </div>

          {/* View All Equipment Button with Location Pop-up */}
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            View All Equipment
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </section>

        {/* Location Permission Pop-up */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-lg font-semibold">Allow Location Access?</p>
              <p className="text-sm text-gray-600">
                We need your location to show available equipment.
              </p>
              <div className="mt-4 flex justify-around">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    getLocationAndStore(); // Fetch and store location if allowed
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Allow
                </button>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    router.push("/equipment"); // Redirect without fetching location
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Soil Analysis */}
        <section className="bg-white rounded-xl p-6 shadow-sm text-center">
          <Sprout className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Soil Analysis Test
          </h2>
          <p className="text-gray-600 mb-4">
            Get personalized crop recommendations based on your soil analysis
          </p>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Analysis
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

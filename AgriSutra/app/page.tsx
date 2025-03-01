"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Tractor, CloudRain, Sprout } from "lucide-react";
import { isAuthenticated } from "../lib/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const getUserIdFromToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("❌ No token found in localStorage.");
        return null;
      }

      try {
        const base64Url = token.split(".")[1];
        if (!base64Url) {
          console.error("❌ Invalid token format.");
          return null;
        }

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedToken = JSON.parse(atob(base64));

        if (!decodedToken.id) {
          console.error("❌ User ID missing in token.");
          return null;
        }

        console.log("✅ User ID from Token:", decodedToken.id);
        return decodedToken.id;
      } catch (error) {
        console.error("❌ Error decoding token:", error);
        return null;
      }
    }

    console.error("❌ Window object not found (server-side).");
    return null;
  };

  const getLocationAndStore = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const token = localStorage.getItem("token");
          if (!token) {
            console.error("❌ No auth token found. User might be logged out.");
            router.push("/equipment");
            return;
          }

          const userId = getUserIdFromToken();
          if (!userId) {
            console.error("❌ User ID not found, skipping location update.");
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
                  Authorization: `Bearer ${token}`,
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
            console.log("✅ Location updated successfully:", data);
          } catch (error) {
            console.error("❌ Error updating location:", error);
          }

          router.push("/equipment");
        },
        (error) => {
          console.error("❌ Error getting location:", error);
          router.push("/equipment");
        }
      );
    } else {
      console.error("❌ Geolocation is not supported by this browser.");
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
            alt={t("homepage.bannerTitle")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">
                {t("homepage.bannerTitle")}
              </h1>
              <p className="text-lg">{t("homepage.bannerQuote")}</p>
            </div>
          </div>
        </section>

        {/* Government Schemes */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("homepage.governmentSchemesTitle")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("homepage.governmentSchemesDescription")}
          </p>
          <button
            onClick={() => router.push("/schemes")}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            {t("homepage.exploreSchemes")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </section>

        {/* Market Trends */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("homepage.marketTrendsTitle")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("homepage.marketTrendsDescription")}
          </p>
          <button
            onClick={() => router.push("/market")}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            {t("homepage.viewAllTrends")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </section>

        {/* Equipment Services */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("homepage.equipmentServicesTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <Tractor className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">
                {t("homepage.tractorBooking")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("homepage.tractorBookingDescription")}
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <CloudRain className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold mb-1">
                {t("homepage.irrigationEquipment")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("homepage.irrigationEquipmentDescription")}
              </p>
            </div>
          </div>

          {/* View All Equipment Button */}
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            {t("homepage.viewAllEquipment")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </section>

        {/* Location Permission Pop-up */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-lg font-semibold">
                {t("homepage.allowLocation")}
              </p>
              <p className="text-sm text-gray-600">
                {t("homepage.locationInfo")}
              </p>
              <div className="mt-4 flex justify-around">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    getLocationAndStore();
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  {t("homepage.allow")}
                </button>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    router.push("/equipment");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  {t("homepage.deny")}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard"; 
import { Category } from "../types/equipment"; 
import { fetchCategories } from "../../lib/apiCalls"; 
import { useRouter } from "next/navigation";
import { FaSearch, FaArrowLeft } from "react-icons/fa"; 
import { useTranslation } from "react-i18next";

const EquipmentPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>("");

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const getUserIdFromToken = () => {
    const token = getToken();
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
  };

  const getLocationAndStore = () => {
    if (!getToken()) {
      console.error("❌ User not authenticated. Redirecting to login.");
      router.push("/login");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });

          const token = getToken();
          const userId = getUserIdFromToken();

          if (!userId) {
            console.error("❌ User ID not found, skipping location update.");
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
                body: JSON.stringify({ location_lat: lat, location_lng: lng }),
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
        },
        (error) => {
          setLocationError(t("equipment.locationInfo"));
          console.error("❌ Error getting location:", error);
        }
      );
    } else {
      setLocationError(t("equipment.locationInfo"));
    }
  };

  useEffect(() => {
    getLocationAndStore();
  }, []);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(t("equipment.loadingCategories"));
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()} 
          className="mr-1 p-2 text-black-600 hover:text-black"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-left mb-1">{t("equipment.farmingEquipments")}</h1>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder={t("equipment.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FaSearch className="absolute left-3 top-4 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">{t("equipment.loadingCategories")}</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-gray-500">{t("equipment.noCategoriesFound")}</p>
          ) : (
            filteredCategories.map((category) => (
              <CategoryCard
                key={category.category_id}
                category_id={category.category_id}
                name={category.name}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EquipmentPage;

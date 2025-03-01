"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun, CloudRain, Wind, Droplets, ArrowLeft, CloudSun, Cloud, Sunrise, Sunset
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function WeatherApp() {
  const router = useRouter();
  const { t } = useTranslation();
  
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [aqiData, setAqiData] = useState<any>(null);
  const [location, setLocation] = useState<string>("Your City");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const API_KEY = process.env.NEXT_PUBLIC_TOMORROW_API_KEY;
  const AQI_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const fetchWeather = async (lat: string, lon: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch Location Name
      const locationResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const locationData = await locationResponse.json();
      setLocation(locationData.city || "Unknown Location");

      // Fetch Real-Time Weather
      const currentWeatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=auto`
      );
      const currentWeatherData = await currentWeatherResponse.json();
      setCurrentTemp(currentWeatherData?.current?.temperature_2m || null);

      // Fetch 7-Day Forecast
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1d&apikey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeatherData(data?.timelines || null);

      // Fetch AQI Data
      const aqiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AQI_API_KEY}`
      );
      if (!aqiResponse.ok) throw new Error("Failed to fetch AQI data");
      const aqiData = await aqiResponse.json();
      setAqiData(aqiData?.list?.[0] || null);
    } catch (err) {
      setError("Failed to fetch weather or AQI data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setShowPopup(true);
    } else {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const handleAllowLocation = () => {
    setShowPopup(false);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toString();
        const lon = position.coords.longitude.toString();
        localStorage.setItem("userLat", lat);
        localStorage.setItem("userLon", lon);
        fetchWeather(lat, lon);
      },
      () => {
        setError("Location access denied. Please enable location services.");
        setLoading(false);
      }
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 text-blue-800">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 text-blue-900 p-6"
    >
      {/* Location Permission Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-lg font-semibold">{t("weather.locationAccess")}</p>
            <p className="text-sm text-gray-600">{t("weather.locationInfo")}</p>
            <div className="mt-4 flex justify-around">
              <button
                onClick={handleAllowLocation}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {t("weather.allow")}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                {t("weather.deny")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Back Arrow & City Name */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft size={28} className="text-blue-900" />
        </button>
        <h1 className="text-2xl font-semibold ml-3">{location}</h1>
      </div>

      {/* Weather Information */}
      <h1 className="text-6xl font-bold">{currentTemp ? `${currentTemp}°` : "--"}</h1>
    </motion.div>
  );
}

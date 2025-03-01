"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun, CloudRain, Wind, Droplets, ArrowLeft, CloudSun, Cloud, Sunrise, Sunset
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WeatherApp() {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [aqiData, setAqiData] = useState<any>(null);
  const [location, setLocation] = useState<string>("Your City");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_TOMORROW_API_KEY;
  const AQI_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const fetchWeather = async (lat: string, lon: string) => {
    try {
      setLoading(true);
      setError(null);

      // 📍 Fetch Location Name
      const locationResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const locationData = await locationResponse.json();
      setLocation(locationData.city || "Unknown Location");

      // 🌡 Fetch Real-Time Weather
      const currentWeatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=auto`
      );
      const currentWeatherData = await currentWeatherResponse.json();
      setCurrentTemp(currentWeatherData?.current?.temperature_2m || null);

      // 🌤 Fetch 7-Day Forecast
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1d&apikey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeatherData(data?.timelines || null);

      // 🌫 Fetch AQI Data
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
    } else {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
    }
  }, []);

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

  const minTemp = weatherData?.daily?.[0]?.values?.temperatureMin;
  const condition = weatherData?.daily?.[0]?.values?.weatherCode;
  const uvIndex = weatherData?.daily?.[0]?.values?.uvIndexMax;
  const humidity = weatherData?.daily?.[0]?.values?.humidity;
  const windSpeed = weatherData?.daily?.[0]?.values?.windSpeed;
  const sunriseTime = weatherData?.daily?.[0]?.values?.sunrise?.split("T")[1];
  const sunsetTime = weatherData?.daily?.[0]?.values?.sunset?.split("T")[1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 text-blue-900 p-6"
    >
      {/* Header with Back Arrow & City Name */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft size={28} className="text-blue-900" />
        </button>
        <h1 className="text-2xl font-semibold ml-3">{location}</h1>
      </div>

      {/* Current Temperature */}
      <div className="flex justify-between items-center">
      <h1 className="text-6xl font-bold">{currentTemp ? `${currentTemp}°` : "--"}</h1>
      {getWeatherIcon(condition)}
      </div>
      <p className="text-lg text-blue-700">
      {minTemp ? `${minTemp}° / ${currentTemp}°` : "--"}
      </p>
      <p className="text-lg text-blue-700">{condition || ""}</p>


      {/* Weekly Forecast */}
      <Card className="bg-blue-100 p-4 mt-6 rounded-lg shadow-md">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-blue-800">7-Day Forecast</h3>
          <div className="flex flex-col space-y-4">
            {weatherData?.daily &&
              weatherData.daily
                .slice(1, 8)
                .map((day: any, index: number) => {
                  const dayOfWeek = new Date(day.time).toLocaleDateString("en-US", { weekday: "long" });

                  return (
                    <div key={index} className="flex justify-between bg-white p-2 rounded-md shadow-sm">
                      <p className="font-medium text-blue-700">{dayOfWeek}</p>
                      <div className="flex items-center text-blue-600">
                        {getWeatherIcon(day.values.weatherCode)}
                        <span className="ml-2 font-semibold">
                          {day.values.temperatureMin ?? "--"}° / {day.values.temperatureMax ?? "--"}°
                        </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        </CardContent>
      </Card>

      {/* AQI Section */}
      <Card className="bg-white p-4 mt-6 rounded-lg shadow-md">
        <CardContent>
          <h3 className="text-xl font-semibold">Air Quality Index</h3>
          {aqiData ? (
            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold" style={{ color: getAqiColor(aqiData.main.aqi) }}>
                {aqiData.main.aqi}
              </p>
              <p className="text-lg">{getAqiWarning(aqiData.main.aqi)}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Helper Functions
const getWeatherIcon = (weatherCode: string | null) => (!weatherCode ? <Cloud size={24} /> : <Sun size={24} />);
const getAqiColor = (aqi: number) => (aqi <= 50 ? "#00E400" : aqi <= 100 ? "#FFFF00" : "#FF7E00");
const getAqiWarning = (aqi: number) => (aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : "Unhealthy");
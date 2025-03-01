"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import states from "../helper/states.json";
import districtsData from "../helper/districts.json";
import commodities from "../helper/commodities.json";

// 1. Import the translation hook
import { useTranslation } from "react-i18next";

interface State {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

interface Commodity {
  id: string;
  name: string;
}

interface MarketData {
  "S.No": number;
  City: string;
  Commodity: string;
  "Min Price": number;
  "Max Price": number;
  "Model Price": number;
  Date: string;
}

const typedStates: State[] = states;
const typedDistricts: Record<string, District[]> = districtsData;
const typedCommodities: Commodity[] = commodities;

export default function MarketPage() {
  const [commodity, setCommodity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [appUrl, setAppUrl] = useState<string>("");
  const MAX_RETRIES = 3;
  const router = useRouter();

  // 2. Initialize the translation hook
  const { t } = useTranslation();

  // Districts based on selected state
  const districts = state ? typedDistricts[state] || [] : [];

  // Update appUrl whenever commodity, state, or district changes
  useEffect(() => {
    if (commodity && state && district) {
      setAppUrl(
        `http://localhost:3001/api/market-trends?commodity=${commodity}&state=${state}&market=${district}`
      );
    }
  }, [commodity, state, district]);

  const fetchMarketData = async (attempt = 1) => {
    try {
      if (!commodity || !state || !district) {
        setError(t("marketPage.selectAllFields"));
        return;
      }
      setLoading(true);
      setError("");

      const response = await fetch(appUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json: MarketData[] = await response.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        console.log(`Retrying... Attempt ${attempt + 1}`);
        setTimeout(() => fetchMarketData(attempt + 1), 2000);
      } else {
        setError(t("marketPage.fetchError"));
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      {/* Header with Back Arrow */}
      <div className="flex items-center justify-between bg-green-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-white hover:text-gray-200"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
        </button>
        {/* 3. Translate "Agri Market Trends 🌿" */}
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {t("marketPage.heading")} 🌿
        </h1>
        <div></div> {/* Empty div to balance spacing */}
      </div>

      {/* Dropdown Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="border p-2 h-10 rounded"
        >
          {/* 4. Translate "Select Commodity" */}
          <option value="">{t("marketPage.selectCommodity")}</option>
          {typedCommodities.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border p-2 h-10 rounded"
        >
          {/* 5. Translate "Select State" */}
          <option value="">{t("marketPage.selectState")}</option>
          {typedStates.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-2 h-10 rounded"
        >
          {/* 6. Translate "Select District" */}
          <option value="">{t("marketPage.selectDistrict")}</option>
          {districts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* 7. Translate "Fetch Data" */}
        <button
          onClick={() => fetchMarketData()}
          className="bg-green-600 text-white px-4 py-2 h-10 rounded shadow"
        >
          {t("marketPage.fetchData")}
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-6 text-green-700">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                🌱
              </div>
            </div>
            {/* 8. Translate "Fetching Market Data..." */}
            <p className="mt-3 font-medium">{t("marketPage.fetchingData")}</p>
          </div>
        ) : error ? (
          <p className="text-center py-4 text-red-500 font-semibold">{error}</p>
        ) : data.length === 0 ? (
          // 9. Translate "No market trends available..."
          <p className="text-center py-4 text-green-700 font-semibold">
            {t("marketPage.noMarketData")}
          </p>
        ) : (
          <table className="min-w-full border border-green-300 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="border p-3">S.No</th>
                <th className="border p-3">{t("marketPage.city")}</th>
                <th className="border p-3">{t("marketPage.commodity")}</th>
                <th className="border p-3">{t("marketPage.minPrice")}</th>
                <th className="border p-3">{t("marketPage.maxPrice")}</th>
                <th className="border p-3">{t("marketPage.modelPrice")}</th>
                <th className="border p-3">{t("marketPage.date")}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={idx}
                  className="transition-colors duration-200 hover:bg-green-100 hover:scale-105"
                >
                  <td className="border p-3 text-green-700">{idx + 1}</td>
                  <td className="border p-3 text-green-700">{item.City}</td>
                  <td className="border p-3 text-green-700">{item.Commodity}</td>
                  <td className="border p-3 text-green-700">
                    {item["Min Price"]}
                  </td>
                  <td className="border p-3 text-green-700">
                    {item["Max Price"]}
                  </td>
                  <td className="border p-3 text-green-700">
                    {item["Model Price"]}
                  </td>
                  <td className="border p-3 text-green-700">{item.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

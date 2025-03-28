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


// // pages/MarketGraphPage.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';

// interface MarketData {
//   'S.No': number;
//   City: string;
//   Commodity: string;
//   'Min Price': number;
//   'Max Price': number;
//   'Model Price': number;
//   Date: string;
// }

// export default function MarketGraphPage() {
//   const [data, setData] = useState<MarketData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Filter states for user selection
//   const [commodity, setCommodity] = useState("Tomato");
//   const [stateName, setStateName] = useState("Maharashtra");
//   const [market, setMarket] = useState("Mumbai");

//   // To trigger a new fetch when the user submits the form
//   const [filters, setFilters] = useState({ commodity, state: stateName, market });

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/market-trends?commodity=${encodeURIComponent(filters.commodity)}&state=${encodeURIComponent(filters.state)}&market=${encodeURIComponent(filters.market)}`
//         );
//         if (!response.ok) throw new Error('Failed to fetch data');
//         const json = await response.json();

//         // Defensive mapping + validation
//         const formatted = Array.isArray(json)
//           ? json
//               .filter(item =>
//                 item &&
//                 item.Date &&
//                 !isNaN(new Date(item.Date).getTime()) &&
//                 !isNaN(Number(item['Min Price'])) &&
//                 !isNaN(Number(item['Max Price'])) &&
//                 !isNaN(Number(item['Model Price']))
//               )
//               .map((item) => ({
//                 ...item,
//                 'Min Price': Number(item['Min Price']),
//                 'Max Price': Number(item['Max Price']),
//                 'Model Price': Number(item['Model Price']),
//               }))
//               .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
//           : [];

//         setData(formatted);
//       } catch (err: any) {
//         setError(err.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filters]);

//   // Form submission handler to update filters
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFilters({ commodity, state: stateName, market });
//   };

//   return (
//     <div className="p-6 bg-green-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
//         Market Price Trend 📈
//       </h1>

//       {/* Form for user to select filters */}
//       <form onSubmit={handleSubmit} className="mb-6 max-w-2xl mx-auto bg-white rounded shadow p-4">
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Commodity:</label>
//           <input
//             type="text"
//             value={commodity}
//             onChange={(e) => setCommodity(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Enter commodity"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-medium mb-1">State:</label>
//           <input
//             type="text"
//             value={stateName}
//             onChange={(e) => setStateName(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Enter state"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Market:</label>
//           <input
//             type="text"
//             value={market}
//             onChange={(e) => setMarket(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Enter market"
//           />
//         </div>
//         <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
//           Get Data
//         </button>
//       </form>

//       {/* Display selected filters above the graph */}
//       <div className="text-center mb-4">
//         <p>
//           <strong>Commodity:</strong> {filters.commodity} | <strong>State:</strong> {filters.state} | <strong>Market:</strong> {filters.market}
//         </p>
//       </div>

//       {loading ? (
//         <p className="text-center text-green-700 font-semibold">Loading data...</p>
//       ) : error ? (
//         <p className="text-center text-red-500 font-medium">
//           {error || "We couldn't fetch the data. Please try again later."}
//         </p>
//       ) : data.length === 0 ? (
//         <p className="text-center text-gray-600">
//           No data available for selected filters.
//         </p>
//       ) : (
//         <div className="max-w-4xl mx-auto bg-white rounded shadow p-4">
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="Date"
//                 tickFormatter={(date) => {
//                   const d = new Date(date);
//                   return `${d.getDate()}/${d.getMonth() + 1}`;
//                 }}
//               />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Min Price" stroke="#8884d8" strokeWidth={2} />
//               <Line type="monotone" dataKey="Max Price" stroke="#82ca9d" strokeWidth={2} />
//               <Line type="monotone" dataKey="Model Price" stroke="#ffc658" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }

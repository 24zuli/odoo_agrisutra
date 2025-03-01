// app/quiz/page.tsx
"use client";

import React, { useState, useEffect } from "react";

interface FormData {
  N: string;
  P: string;
  K: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}

interface ResultType {
  recommendedCrop: string;
  description: string;
  tips?: string[];
}

export default function QuizPage() {
  const [formData, setFormData] = useState<FormData>({
    N: " ",
    P: "0",
    K: "0",
    temperature: "0",
    humidity: "0",
    ph: "0",
    rainfall: "0",
  });

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!apiUrl) {
      setError("API URL not available");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/seeds/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
        }),
      });

      if (!response.ok) {
        throw new Error(
          (await response.text()) || "Failed to fetch prediction"
        );
      }

      const data: ResultType = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        (err as Error).message || "Error fetching prediction. Please try again."
      );
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Optional nav link back to home */}
      <div className="mb-4">
        <a
          href="/"
          className="inline-flex items-center text-sm text-green-700 hover:text-green-800"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Home
        </a>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-xl font-bold mb-2 text-green-700">Soil Analysis</h1>
        <p className="text-sm text-gray-600 mb-4">
          Enter your soil parameters and environmental conditions to get a
          personalized crop recommendation.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Nitrogen */}
          <div>
            <label className="block font-medium text-sm mb-1" htmlFor="N">
              Nitrogen (N)
            </label>
            <input
              id="N"
              name="N"
              type="number"
              value={formData.N}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
            <p className="text-xs text-gray-400">
              Nitrogen content in soil (0-140)
            </p>
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block font-medium text-sm mb-1" htmlFor="P">
              Phosphorus (P)
            </label>
            <input
              id="P"
              name="P"
              type="number"
              value={formData.P}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
            <p className="text-xs text-gray-400">
              Phosphorus content in soil (0-145)
            </p>
          </div>

          {/* Potassium */}
          <div>
            <label className="block font-medium text-sm mb-1" htmlFor="K">
              Potassium (K)
            </label>
            <input
              id="K"
              name="K"
              type="number"
              value={formData.K}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
            <p className="text-xs text-gray-400">
              Potassium content in soil (0-205)
            </p>
          </div>

          {/* Temperature */}
          <div>
            <label
              className="block font-medium text-sm mb-1"
              htmlFor="temperature"
            >
              Temperature (°C)
            </label>
            <input
              id="temperature"
              name="temperature"
              type="number"
              value={formData.temperature}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
            <p className="text-xs text-gray-400">
              Average temperature in Celsius (8-44)
            </p>
          </div>

          {/* Humidity */}
          <div>
            <label
              className="block font-medium text-sm mb-1"
              htmlFor="humidity"
            >
              Humidity (%)
            </label>
            <input
              id="humidity"
              name="humidity"
              type="number"
              value={formData.humidity}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
            <p className="text-xs text-gray-400">Relative humidity (14-100)</p>
          </div>

          {/* pH */}
          <div>
            <label className="block font-medium text-sm mb-1" htmlFor="ph">
              pH Level
            </label>
            <input
              id="ph"
              name="ph"
              type="number"
              step="0.1"
              value={formData.ph}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
            <p className="text-xs text-gray-400">pH value of soil (3.5-10)</p>
          </div>

          {/* Rainfall */}
          <div>
            <label
              className="block font-medium text-sm mb-1"
              htmlFor="rainfall"
            >
              Rainfall (mm)
            </label>
            <input
              id="rainfall"
              name="rainfall"
              type="number"
              value={formData.rainfall}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
            <p className="text-xs text-gray-400">
              Annual rainfall in mm (20-300)
            </p>
          </div>

          {/* Submit button */}
          <div className="sm:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition-colors"
            >
              Get Recommendation
            </button>
          </div>
        </form>

        {/* Error display */}
        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
      </div>

      {/* Result card */}
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-green-700 mb-2">
            Crop Recommendation
          </h2>
          <h3 className="text-lg font-semibold mb-2">
            {result.recommendedCrop}
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            {result.description || "No description available."}
          </p>
          {result.tips && result.tips.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Growing Tips:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {result.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

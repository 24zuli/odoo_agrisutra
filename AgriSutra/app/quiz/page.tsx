"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FormData {
  N: string;
  P: string;
  K: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
  file?: File | null;
}

interface ResultType {
  recommendedCrop: string;
  description: string;
  extractedText?: string;
  tips?: string[];
}

export default function QuizPage() {
  const { t } = useTranslation();
  const [inputMethod, setInputMethod] = useState<"manual" | "file">("manual");
  const [formData, setFormData] = useState<FormData>({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    file: null,
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
    return <div className="container mx-auto p-6">{t("loading")}</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, file: e.target.files?.[0] || null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!apiUrl) {
      setError(t("soilAnalysis.errorFetching"));
      return;
    }

    try {
      const formDataToSend = new FormData();

      if (inputMethod === "manual") {
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "file") {
            formDataToSend.append(key, value);
          }
        });
      }

      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await fetch(`${apiUrl}/api/seeds/predict`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(await response.text() || t("soilAnalysis.errorFetching"));
      }

      const data: ResultType = await response.json();
      console.log("API Response:", data); // ✅ Debugging API Response
      setResult(data);
    } catch (err) {
      setError((err as Error).message || t("soilAnalysis.errorFetching"));
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-4">
        <a href="/" className="inline-flex items-center text-sm text-green-700 hover:text-green-800">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span className="text-2xl font-extrabold">{t("soilAnalysis.title")}</span>
        </a>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-green-400 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-xl font-bold mb-2 text-green-700">{t("soilAnalysis.description")}</h1>
        <p className="text-sm text-gray-600 mb-4">{t("soilAnalysis.chooseMethod")}</p>

        {/* Input method toggle */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="manual"
              checked={inputMethod === "manual"}
              onChange={() => setInputMethod("manual")}
              className="form-radio text-green-600"
            />
            <span>{t("soilAnalysis.manualInput")}</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="file"
              checked={inputMethod === "file"}
              onChange={() => setInputMethod("file")}
              className="form-radio text-green-600"
            />
            <span>{t("soilAnalysis.uploadPdfImage")}</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inputMethod === "manual" && (
            <>
              {Object.keys(formData).map((key) =>
                key !== "file" ? (
                  <div key={key}>
                    <label className="block font-medium text-sm mb-1">
                      {t(`soilAnalysis.formLabels.${key}`, key)}
                    </label>
                    <input
                      name={key}
                      type="number"
                      value={(formData as any)[key]}
                      onChange={handleChange}
                      className="border border-gray-300 rounded w-full p-2"
                      required
                    />
                  </div>
                ) : null
              )}
            </>
          )}

          {inputMethod === "file" && (
            <div className="sm:col-span-2">
              <label className="block font-medium text-sm mb-1">{t("soilAnalysis.uploadLabel")}</label>
              <input type="file" accept=".pdf, image/*" onChange={handleChange} className="border border-gray-300 rounded w-full p-2" required />
            </div>
          )}

          <div className="sm:col-span-2 mt-2">
            <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition-colors">
              {t("soilAnalysis.getRecommendation")}
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Corrected Result Display */}
      {result && (
  <div className="relative overflow-hidden rounded-2xl border-l-[6px] border-green-600 bg-white/60 backdrop-blur-md shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
    
    {/* Decorative Blur Glow */}
    <div className="absolute -top-10 -left-10 w-48 h-48 bg-green-200 opacity-20 blur-3xl rounded-full pointer-events-none z-0" />
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-100 opacity-30 blur-2xl rounded-full pointer-events-none z-0" />

    <div className="relative z-10">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-green-700 mb-3">
        {t("soilAnalysis.cropRecommendation")}
      </h2>

      {/* Crop Name Tag */}
      <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-3 shadow-sm">
        {result.recommendedCrop || t("soilAnalysis.noDescription")}
      </span>

      {/* Description */}
      <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
        {result.description || t("soilAnalysis.noDescription")}
      </p>

      {/* Cultivation Tips */}
      {result.tips && result.tips.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">
            {t("soilAnalysis.tipsHeading") || "Tips for Cultivation:"}
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-1">
            {result.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
)}


    </main>
  );
}

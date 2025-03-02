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
        <p className="text-sm text-gray-600 mb-4">{t(" ")}</p>

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
                      {t(`soilAnalysis.formLabels.${key}`)}
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
    </main>
  );
}

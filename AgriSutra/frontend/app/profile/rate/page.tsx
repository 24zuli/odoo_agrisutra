"use client";

import React, { useState } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// 1. Import the translation hook
import { useTranslation } from "react-i18next";

export default function RateOurAppPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // 2. Initialize the translation hook
  const { t } = useTranslation();

  // Handle clicking a star
  const handleRate = (value: number) => {
    setRating(value);
  };

  // Handle Submit button
  const handleSubmit = async () => {
    if (rating === 0) {
      // 3. Replace alert text with translation
      alert(t("ratePage.pleaseSelectRating"));
      return;
    }
    try {
      setSubmitting(true);
      // TODO: Replace with your API call if needed
      // 4. Use interpolation for rating
      alert(t("ratePage.submittedRating", { rating }));
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with Back Arrow and Title */}
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button
          onClick={() => router.back()}
          className="text-black hover:text-gray-900 focus:outline-none mr-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        {/* 5. Replace "Rate Us" with translation */}
        <h1 className="text-2xl font-bold text-black">
          {t("ratePage.rateUs")}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-4 flex-1">
        {/* 6. Replace "Rate Our App" with translation */}
        <h1 className="text-2xl font-bold mb-1">{t("ratePage.rateOurApp")}</h1>
        {/* 7. Replace "Tell us how we're doing" with translation */}
        <p className="text-gray-600 mb-4">
          {t("ratePage.tellUsHowWeAreDoing")}
        </p>

        {/* Stars */}
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => handleRate(star)}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-400"
              }`}
            />
          ))}
        </div>

        {/* 8. Replace "Tap a star to rate" with translation */}
        <p className="mt-2 text-gray-500">{t("ratePage.tapAStar")}</p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {/* 9. Replace "Submitting..." and "Submit" with translation */}
          {submitting ? t("ratePage.submitting") : t("ratePage.submit")}
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

export default function RateOurAppPage() {
  // Local state for the user's rating (1–5, or 0 if not rated yet)
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Handle clicking a star
  const handleRate = (value: number) => {
    setRating(value);
  };

  // Handle Submit button
  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Replace this with your real API call or logic
      // e.g., await fetch("/api/rate", { method: "POST", body: JSON.stringify({ rating }) });

      alert(`You submitted a rating of ${rating} stars!`);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-1">Rate Our App</h1>
      <p className="text-gray-600 mb-4">Tell us how we're doing</p>

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

      <p className="mt-2 text-gray-500">Tap a star to rate</p>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

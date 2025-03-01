"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  details?: string;
  benefits?: string[];
  eligibility?: string[];
  youtube_link?: string;
  registration_link?: string;
}

export default function SchemeDetailClient({ scheme }: { scheme: Scheme }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"details" | "benefits" | "eligibility" | "links">(
    "details"
  );

  const handleSaveScheme = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to save a scheme.");
        return;
      }
      const res = await fetch(`http://localhost:3001/api/schemes/${scheme.id}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to save scheme");
      alert("Scheme saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save scheme.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header with Back Arrow and Save Button */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-green-800 hover:text-green-600"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-semibold">Scheme Details</span>
        </button>
        <Button 
          onClick={handleSaveScheme} 
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Save Scheme
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-green-900 mb-6">{scheme.name}</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {(["details", "benefits", "eligibility", "links"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 ${
              activeTab === tab 
              ? "border-b-2 border-green-500 text-green-800 font-semibold" 
              : "text-gray-500 hover:text-green-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-gray-50 rounded-lg">
        {activeTab === "details" && <p className="text-gray-700">{scheme.details}</p>}

        {activeTab === "benefits" && scheme.benefits && (
          <ul className="list-disc pl-5 text-gray-700">
            {scheme.benefits.map((benefit, index) => (
              <li key={index} className="mb-2">{benefit}</li>
            ))}
          </ul>
        )}

        {activeTab === "eligibility" && scheme.eligibility && (
            <ul className="list-disc pl-5 text-gray-700">
              {scheme.eligibility.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
        )}

        {activeTab === "links" && (
          <div className="space-y-4">
            {scheme.youtube_link && (
              <a
                href={scheme.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-600 hover:text-green-800 underline"
              >
                YouTube Guidance
              </a>
            )}
            {scheme.registration_link && (
              <a
                href={scheme.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-600 hover:text-green-800 underline"
              >
                Click here to know more or register
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
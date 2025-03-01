"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchSchemes } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
// 1. Import the translation hook
import { useTranslation } from "react-i18next";

const SchemeCard = ({ scheme }: { scheme: any }) => {
  // 2. Initialize translation hook if you want to translate "Learn More" directly
  const { t } = useTranslation();

  return (
    <div className="bg-white border border-gray-200 rounded-large p-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
      <h3 className="text-xl font-bold text-green-800 mb-2">{scheme.name}</h3>
      <p className="text-gray-600 mb-4">{scheme.description}</p>
      <Link href={`/schemes/${scheme.id}`}>
        <Button className="bg-green-500 hover:bg-green-600 text-white transition-transform transform active:scale-95">
          {/* 3. Translate "Learn More" */}
          {t("trendingSchemesPage.learnMore")}
        </Button>
      </Link>
    </div>
  );
};

export default function TrendingSchemesPage() {
  const router = useRouter();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 4. Initialize the translation hook
  const { t } = useTranslation();

  useEffect(() => {
    fetchSchemes()
      .then((data) => setSchemes(data))
      .catch((err) => console.error("Error fetching schemes:", err));
  }, []);

  // Filter schemes by search query
  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Further filter schemes to get only trending schemes (date between 2023-01-01 and 2025-12-31)
  const trendingSchemes = filteredSchemes.filter(
    (scheme) => scheme.date >= "2023-01-01" && scheme.date <= "2025-12-31"
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-green-800 hover:text-green-600 mb-4"
          >
            <ArrowLeft className="h-6 w-6 mr-3" />
            {/* 5. Translate "Trending Government Schemes" */}
            <span className="text-2xl font-bold text-green-800">
              {t("trendingSchemesPage.title")}
            </span>
          </button>

          <div className="relative mb-6">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              // 6. Translate "Search trending schemes..."
              placeholder={t("trendingSchemesPage.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Trending Schemes Section */}
        <div>
          {/* 7. Translate "Top Trending Schemes" */}
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            {t("trendingSchemesPage.topTrendingSchemes")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

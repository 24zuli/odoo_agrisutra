"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchSchemes } from "@/lib/api";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

const SchemeCard = ({ scheme }: { scheme: any }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg transition-all duration-300"
  >
    <h3 className="text-xl font-bold text-green-700 mb-2">{scheme.name}</h3>
    <p className="text-gray-600 mb-4">{scheme.description}</p>
    <Link href={`/schemes/${scheme.id}`}>
      <Button className="bg-green-500 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 rounded-large">
        Learn More
      </Button>
    </Link>
  </motion.div>
);

export default function AllSchemesPage() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSchemes()
      .then((data) => setSchemes(data))
      .catch((err) => console.error("Error fetching schemes:", err));
  }, []);

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={() => history.back()}
          className="flex items-center text-green-700 hover:text-green-600 mb-6"
        >
          <ArrowLeft className="h-6 w-6 mr-3" />
          <span className="text-2xl font-bold">All Government Schemes</span>
        </button>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
}

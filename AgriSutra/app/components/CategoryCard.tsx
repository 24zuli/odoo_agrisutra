"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaTractor } from "react-icons/fa"; // Importing tractor icon

interface CategoryCardProps {
  category_id: number;
  name: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ category_id, name }) => {
  const router = useRouter();

  const handleCategoryClick = () => {
    console.log("Navigating to category:", name);
    router.push(`/equipment/${name.toLowerCase()}`); // Navigate dynamically
  };

  return (
    <div
      onClick={handleCategoryClick}
      className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 border border-gray-200"
    >
      {/* Icon at the top */}
      <FaTractor className="text-green-600 text-4xl mb-3" />

      {/* Category Name */}
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
    </div>
  );
};

export default CategoryCard;

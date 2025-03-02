"use client"; // ✅ This file is a Client Component

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlusCircle, FaEye } from "react-icons/fa"; // Import icons

const CategoryActions = ({ category }: { category: string }) => {
  const router = useRouter();

  // Navigation functions
  const navigateToGiveEquipment = () => {
    router.push(`/equipment/${category}/giveEquipment`);
  };

  const navigateToTakeEquipment = () => {
    router.push(`/equipment/${category}/takeEquipment`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* ✅ Header with Back Button and Category Name */}
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-black mr-4"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="mr-2" /> 
        </button>
        <h1 className="text-2xl font-bold capitalize">{category}</h1>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Give Equipment Card */}
        <div
          onClick={navigateToGiveEquipment}
          className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
            <FaPlusCircle className="text-green-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold">Want to give your equipment?</h3>
          <p className="text-gray-500 text-center mt-2">List your equipment for others to use</p>
        </div>

        {/* Take Equipment Card */}
        <div
          onClick={navigateToTakeEquipment}
          className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
            <FaEye className="text-blue-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold">Want to use equipment?</h3>
          <p className="text-gray-500 text-center mt-2">Find and book equipment for your needs</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryActions;
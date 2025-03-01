"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAvailableEquipment } from "@/lib/apiCalls";

interface Equipment {
  equipment_id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  owner_name: string;
  availability: string;
}

const AvailableEquipment = ({ category }: { category: string }) => {
  const router = useRouter();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadEquipment = async () => {
      const data: Equipment[] = await fetchAvailableEquipment(category); // ✅ Fetch all equipment
      setEquipment(data);
    };
    loadEquipment();
  }, [category]); // ✅ Refetch data if the category changes

  const filteredEquipment =
  filter === "All"
    ? equipment
    : equipment.filter((e) =>
        e.availability && e.availability.toLowerCase() === filter.toLowerCase()
      );


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available {category} Equipment</h1>

      {/* Filters */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Filter Options</h3>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="filter"
              value="All"
              checked={filter === "All"}
              onChange={() => setFilter("All")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="Available Now"
              checked={filter === "Available Now"}
              onChange={() => setFilter("Available Now")}
            />
            Available Now
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="Not Available"
              checked={filter === "Not Available"}
              onChange={() => setFilter("Not Available")}
            />
            Not Available
          </label>
        </div>
      </div>

      {/* Equipment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((item: Equipment) => (
            <div
              key={item.equipment_id}
              className={`bg-white shadow-md rounded-lg p-4 flex ${
                item.availability === "Not Available" ? "opacity-50" : ""
              }`}
            >
              <img
                src="/placeholder.jpg"
                alt={item.name}
                className="w-24 h-24 object-cover mr-4 rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-600 font-semibold mt-2">
                  ₹{item.price}/day
                </p>
                <p className="text-sm text-gray-500">Location: {item.location}</p>
                <p className="text-sm text-gray-500">
                  Owner: <strong>{item.owner_name}</strong>
                </p>
                <p className="text-sm font-bold text-red-500">
                  {item.availability}
                </p>
                {/* ✅ Disable button if "Not Available" */}
                <button
                  onClick={() =>
                    router.push(
                      `/equipment/${category}/bookEquipment?equipment_id=${item.equipment_id}`
                    )
                  }
                  className={`p-2 rounded-md mt-3 ${
                    item.availability === "Not Available"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white"
                  }`}
                  disabled={item.availability === "Not Available"}
                >
                  {item.availability === "Not Available" ? "Unavailable" : "Book Now"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No {category} equipment available.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableEquipment;

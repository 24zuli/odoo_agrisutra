"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchEquipmentDetails, bookEquipment } from "@/lib/apiCalls";

const BookEquipment = ({ category }: { category: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const equipmentId = searchParams.get("equipment_id");

  const [equipment, setEquipment] = useState<any>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (equipmentId) {
      fetchEquipmentDetails(equipmentId).then((data) => setEquipment(data));
    }
  }, [equipmentId]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates.");
      return;
    }
    
    if (!equipmentId) {
        alert("Equipment ID is missing!");
        return;
    }
    const response = await bookEquipment(equipmentId, startDate, endDate);
    if (response.success) {
      alert("Booking confirmed!");
    //   router.push(`/equipment/${category}/takeEquipment`);
      router.push(`/equipment`);  
    } else {
      alert("Failed to book equipment.");
    }
  };

  if (!equipment) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Book {equipment.name}</h1>
      {/* <img
        src={equipment.image_url || "/placeholder.jpg"}
        alt={equipment.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      /> */}
      <p className="text-gray-600">{equipment.description}</p>
      <p className="text-green-600 font-semibold mt-2">
        ₹{equipment.price}/day
      </p>
      <p className="text-sm text-gray-500">Location: {equipment.location}</p>
      <p className="text-sm text-gray-500">
        Owner: <strong>{equipment.owner_name}</strong>
      </p>
      <p className="text-sm text-gray-500">
        Contact: <strong>{equipment.phone_number}</strong>
      </p>

      {/* Booking Form */}
      <div className="bg-white p-4 shadow-md rounded-lg mt-4">
        <h3 className="font-semibold">Booking Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={handleBooking}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold mt-4"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookEquipment;

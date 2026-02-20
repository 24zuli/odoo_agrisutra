"use client"; // ✅ This is a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const GiveEquipmentForm = ({ category }: { category: string }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    availability: "Available Now",
    images: null as FileList | null, // ✅ Fix Type Issue
    phone_number: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      location: formData.location,
      availability: formData.availability,
      phone_number: formData.phone_number,
      category: category,
    };

    try {
      const token = localStorage.getItem("token"); // ✅ Get token from storage

      const response = await fetch(
        `https://backend-agrisutra.onrender.com/api/equipment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send token in request
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        alert("Equipment listed successfully!");
        router.push(`/`);
      } else {
        console.error("🔥 Error Response:", responseData);
        alert(
          "Failed to list equipment. " + (responseData.error || "Unknown Error")
        );
      }
    } catch (error) {
      console.error("🔥 Network Error:", error);
      alert("A network error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        className="flex items-center text-black-600 hover:text-black mb-6"
        onClick={() => router.back()}
      >
        <FaArrowLeft className="mr-3" />{" "}
        <h6 className="text-2xl font-bold mb-1">List Your {category}</h6>
      </button>

      {/* Title */}
      {/* <h1 className="text-3xl font-bold mb-4">List Your {category}</h1> */}

      <p className="text-gray-600 mb-6">
        List your farming equipment for others to use. Fill out the details
        below to make your equipment available.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        {/* Equipment Name */}
        <label className="block font-semibold">Equipment Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g., John Deere 5075E Tractor"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        {/* Description */}
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          placeholder="Describe your equipment, including condition, features, etc."
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        {/* Price & Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Rental Rate (per day)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 5000"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg mb-4"
            />
          </div>

          <div>
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Amritsar, Punjab"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg mb-4"
            />
          </div>
        </div>

        {/* Availability */}
        <label className="block font-semibold">Availability</label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option>Available Now</option>
          <option>Not Available</option>
        </select>

        {/* Upload Photos */}
        {/* <label className="block font-semibold">Upload Photos</label>
        <input type="file" multiple onChange={handleFileChange} className="w-full p-2 border rounded-lg mb-4" /> */}

        {/* Contact Number */}
        <label className="block font-semibold">Contact Information</label>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold"
        >
          List Equipment
        </button>
      </form>
    </div>
  );
};

export default GiveEquipmentForm;

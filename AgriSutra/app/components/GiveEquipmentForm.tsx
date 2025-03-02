"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";

const GiveEquipmentForm = ({ category }: { category: string }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    availability: "Available Now",
    phone_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      category,
    };

    try {
      const token = localStorage.getItem("token"); 

      const response = await fetch(`http://localhost:3001/api/equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(t("giveEquipment.successMessage"));
        router.push(`/equipment/${category}`);
      } else {
        console.error("🔥 Error Response:", responseData);
        alert(t("giveEquipment.errorMessage"));
      }
    } catch (error) {
      console.error("🔥 Network Error:", error);
      alert(t("giveEquipment.networkError"));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button className="flex items-center text-gray-600 hover:text-black mb-6" onClick={() => router.back()}>
        <FaArrowLeft className="mr-2" /> {t("general.back")}
      </button>

      <h1 className="text-3xl font-bold mb-4">{t("giveEquipment.title", { category })}</h1>

      <p className="text-gray-600 mb-6">{t("giveEquipment.description")}</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <label className="block font-semibold">{t("giveEquipment.equipmentName")}</label>
        <input
          type="text"
          name="name"
          placeholder={t("giveEquipment.equipmentPlaceholder")}
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block font-semibold">{t("giveEquipment.descriptionLabel")}</label>
        <textarea
          name="description"
          placeholder={t("giveEquipment.descriptionPlaceholder")}
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">{t("giveEquipment.rentalRate")}</label>
            <input
              type="number"
              name="price"
              placeholder={t("giveEquipment.pricePlaceholder")}
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg mb-4"
            />
          </div>

          <div>
            <label className="block font-semibold">{t("giveEquipment.location")}</label>
            <input
              type="text"
              name="location"
              placeholder={t("giveEquipment.locationPlaceholder")}
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg mb-4"
            />
          </div>
        </div>

        <label className="block font-semibold">{t("giveEquipment.availability")}</label>
        <select name="availability" value={formData.availability} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4">
          <option>{t("giveEquipment.availableNow")}</option>
          <option>{t("giveEquipment.notAvailable")}</option>
        </select>

        <label className="block font-semibold">{t("giveEquipment.contactInfo")}</label>
        <input
          type="text"
          name="phone_number"
          placeholder={t("giveEquipment.phonePlaceholder")}
          value={formData.phone_number}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold">
          {t("giveEquipment.listButton")}
        </button>
      </form>
    </div>
  );
};

export default GiveEquipmentForm;

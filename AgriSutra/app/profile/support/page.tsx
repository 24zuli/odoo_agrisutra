"use client";

import React from "react";
// Icons from lucide-react (install if you haven't: npm install lucide-react)
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function HelpAndSupportPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-1">How can we help you?</p>
      </div>

      {/* Contact Options */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Call Us */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition">
            <Phone className="h-10 w-10 text-green-600 mb-4" />
            <h2 className="text-lg font-semibold">Call Us</h2>
            <p className="text-sm text-gray-500">+91 7984420655</p>
          </div>

          {/* Email Support */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition">
            <Mail className="h-10 w-10 text-green-600 mb-4" />
            <h2 className="text-lg font-semibold">Email Support</h2>
            <p className="text-sm text-gray-500">agrisutra4@gmail.com</p>
          </div>

          {/* Chat Support */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition">
            <MessageCircle className="h-10 w-10 text-green-600 mb-4" />
            <h2 className="text-lg font-semibold">Chat Support</h2>
            <p className="text-sm text-gray-500">Contact at whatsapp</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          <li className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold">How do I track my equipment?</p>
            <p className="text-sm text-gray-500 mt-1">
              You can track your equipment by visiting the "Track Equipment"
              section under your profile.
            </p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold">How to update my profile?</p>
            <p className="text-sm text-gray-500 mt-1">
              Go to "Edit Profile" under your profile menu to change your
              details.
            </p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold">Where can I find help on schemes?</p>
            <p className="text-sm text-gray-500 mt-1">
              Check out the "Schemes" page in the main menu for detailed
              information.
            </p>
          </li>
          {/* Add more FAQs as needed */}
        </ul>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Mail, Phone, Globe, Target, FileText, Shield } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm mb-4">
        <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto bg-white p-6 rounded-lg shadow-sm space-y-8">
        {/* Mission */}
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To empower farmers with modern technology and provide them with the
            best agricultural solutions for sustainable farming practices.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Contact Information
            </h2>
          </div>

          <div className="mt-3 space-y-3">
            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-green-600" />
              <a
                href="mailto:agrisutra@gmail.com"
                className="text-blue-600 hover:underline"
              >
                agrisutra4@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">+91 7984420655</span>
            </div>

            {/* Website */}
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <a
                href="https://www.agrisutra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.agrisutra.com
              </a>
            </div>
          </div>
        </section>

        {/* Version Info */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Version</h2>
          <p className="text-gray-700">1.0.0</p>
        </section>

        {/* Terms & Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Terms &amp; Privacy
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

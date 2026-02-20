"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  Globe,
  Target,
  FileText,
  Shield,
  ArrowLeft,
} from "lucide-react";

// 1. Import the translation hook
import { useTranslation } from "react-i18next";

export default function AboutUsPage() {
  const router = useRouter();

  // 2. Initialize the translation hook
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button
          onClick={() => router.back()}
          className="text-black hover:text-gray-900 focus:outline-none mr-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        {/* 3. Replace "About Us" with translation */}
        <h1 className="text-xl font-bold text-black">
          {t("aboutPage.aboutUs")}
        </h1>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Main Content */}
      <div className="max-w-8xl mx-auto bg-white p-6 rounded-lg shadow-sm space-y-8">
        {/* Mission */}
        <section>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-6 w-6 text-green-600" />
            {/* 4. Replace "Our Mission" with translation */}
            <h2 className="text-xl font-semibold text-gray-800">
              {t("aboutPage.ourMission")}
            </h2>
          </div>
          {/* 5. Replace mission text with translation */}
          <p className="text-gray-600 leading-relaxed">
            {t("aboutPage.missionDescription")}
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <div className="flex items-center space-x-2 mb-2">
            {/* 6. Replace "Contact Information" */}
            <h2 className="text-xl font-semibold text-gray-800">
              {t("aboutPage.contactInformation")}
            </h2>
          </div>

          <div className="mt-3 space-y-3">
            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-green-600" />
              <a
                href={`mailto:${t("aboutPage.email")}`}
                className="text-blue-600 hover:underline"
              >
                {t("aboutPage.email")}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">{t("aboutPage.phone")}</span>
            </div>

            {/* Website */}
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <a
                href={`https://${t("aboutPage.website")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {t("aboutPage.website")}
              </a>
            </div>
          </div>
        </section>

        {/* Version Info */}
        <section>
          {/* 7. Replace "Version" and "1.0.0" */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("aboutPage.versionTitle")}
          </h2>
          <p className="text-gray-700">{t("aboutPage.versionNumber")}</p>
        </section>

        {/* Terms & Privacy */}
        <section>
          {/* 8. Replace "Terms & Privacy" */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("aboutPage.termsPrivacyTitle")}
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <a href="/terms" className="text-blue-600 hover:underline">
                {t("aboutPage.termsOfService")}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <a href="/privacy" className="text-blue-600 hover:underline">
                {t("aboutPage.privacyPolicy")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

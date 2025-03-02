"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// 1. Import the translation hook
import { useTranslation } from "react-i18next";

export default function TermsOfServicePage() {
  const router = useRouter();

  // 2. Initialize the translation hook
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="text-black hover:text-gray-900 focus:outline-none mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          {/* 3. Use the translated title */}
          <h1 className="text-xl font-bold text-black">
            {t("termsPage.title")}
          </h1>
        </div>
      </div>

      <div className="max-w-9xl mx-auto bg-white p-6 rounded-lg shadow-sm space-y-6">
        {/* Introduction */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.introductionHeading")}
          </h2>
          <p className="text-gray-600">{t("termsPage.introductionContent")}</p>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.eligibilityHeading")}
          </h2>
          <p className="text-gray-600">{t("termsPage.eligibilityContent")}</p>
        </section>

        {/* Account Registration */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.accountRegistrationHeading")}
          </h2>
          <p className="text-gray-600">
            {t("termsPage.accountRegistrationContent")}
          </p>
        </section>

        {/* Use of Services */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.useOfServicesHeading")}
          </h2>
          <p className="text-gray-600">{t("termsPage.useOfServicesContent")}</p>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.intellectualPropertyHeading")}
          </h2>
          <p className="text-gray-600">
            {t("termsPage.intellectualPropertyContent")}
          </p>
        </section>

        {/* Disclaimers */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.disclaimersHeading")}
          </h2>
          <p className="text-gray-600">{t("termsPage.disclaimersContent")}</p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.limitationOfLiabilityHeading")}
          </h2>
          <p className="text-gray-600">
            {t("termsPage.limitationOfLiabilityContent")}
          </p>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.changesToTermsHeading")}
          </h2>
          <p className="text-gray-600">
            {t("termsPage.changesToTermsContent")}
          </p>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.governingLawHeading")}
          </h2>
          <p className="text-gray-600">{t("termsPage.governingLawContent")}</p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("termsPage.contactUsHeading")}
          </h2>
          <p className="text-gray-600">
            {t("termsPage.contactUsContent")}{" "}
            <a
              href={`mailto:${t("termsPage.contactEmail")}`}
              className="text-blue-600 hover:underline"
            >
              {t("termsPage.contactEmail")}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
// Import the translation hook
import { useTranslation } from "react-i18next";

export default function PrivacyPolicyPage() {
  const router = useRouter();
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
          <h1 className="text-xl font-bold text-black">
            {t("privacyPage.title")}
          </h1>
        </div>
      </div>

      <div className="max-w-9xl mx-auto bg-white p-6 rounded-lg shadow-sm space-y-6">
        {/* Introduction */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.introductionHeading")}
          </h2>
          <p className="text-gray-600">
            {t("privacyPage.introductionContent")}
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.informationWeCollectHeading")}
          </h2>
          <p className="text-gray-600">
            {t("privacyPage.informationWeCollectContent")}
          </p>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.howWeUseYourInformationHeading")}
          </h2>
          <p className="text-gray-600">
            {t("privacyPage.howWeUseYourInformationContentIntro")}
          </p>
          {/* Directly output the one-line string from the JSON */}
          <p className="text-gray-600">
            {t("privacyPage.howWeUseYourInformationList")}
          </p>
        </section>

        {/* Sharing Your Information */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.sharingYourInformationHeading")}
          </h2>
          <p className="text-gray-600">
            {t("privacyPage.sharingYourInformationContent")}
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.cookiesHeading")}
          </h2>
          <p className="text-gray-600">{t("privacyPage.cookiesContent")}</p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.dataRetentionHeading")}
          </h2>
          <p className="text-gray-600">
            {t("privacyPage.dataRetentionContent")}
          </p>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.securityHeading")}
          </h2>
          <p className="text-gray-600">{t("privacyPage.securityContent")}</p>
        </section>

        {/* Children's Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.childrenHeading")}
          </h2>
          <p className="text-gray-600">{t("privacyPage.childrenContent")}</p>
        </section>

        {/* Changes to This Policy */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.changesHeading")}
          </h2>
          <p className="text-gray-600">{t("privacyPage.changesContent")}</p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {t("privacyPage.contactUsHeading")}
          </h2>
          <p className="text-gray-600">
            {t("privacyPage.contactUsContent")}{" "}
            <a
              href={`mailto:${t("privacyPage.contactEmail")}`}
              className="text-blue-600 hover:underline"
            >
              {t("privacyPage.contactEmail")}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

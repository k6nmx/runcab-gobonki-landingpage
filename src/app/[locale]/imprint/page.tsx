"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import LanguageDisclaimer from "@/components/LanguageDisclaimer";
import { useLocale, useTranslations } from "next-intl";

export default function ImprintPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const t = useTranslations("legal");
  const locale = useLocale();

  return (
    <>
      <article className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="mx-auto max-w-3xl bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold text-slate-800 border-b pb-4 mb-6">
            {t("imprint.title")}
          </h1>

          {locale !== "de" && <LanguageDisclaimer />}

          <p className="mb-4">
            <b>runcab GmbH</b>
            <br />
            Flottwellstraße 28
            <br />
            10785 Berlin
            <br />
            Germany
          </p>

          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            Kontaktinformationen
          </h2>
          <p className="mb-4">
            <button
              onClick={() => setContactModalOpen(true)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Schick uns eine E-Mail
            </button>
          </p>

          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            Bevollmächtigte Vertreter
          </h2>
          <p className="mb-4">
            Christian Renner
            <br />
            Max Kolhagen
          </p>

          <p className="mb-4">
            Eingetragener Sitz: Germany
            <br />
            Registergericht: Amtsgericht Charlottenburg
            <br />
            Handelsregisternummer: HRB 278388 B
            <br />
            Umsatzsteuer-ID-Nr.: DE 457638982
          </p>
        </div>
      </article>
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </>
  );
}

import { useTranslations } from "next-intl";

export default function LanguageDisclaimer() {
  const t = useTranslations("languageDisclaimer");

  return (
    <div className="mb-6 p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded-md">
      <h3 className="font-semibold text-lg">{t("title")}</h3>
      <p className="mt-1">{t("description")}</p>
    </div>
  );
}

import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <div>
      <Hero />
      <div className="min-h-screen bg-red-300"></div>
      <div className="min-h-screen bg-slate-600"></div>
    </div>
  );
}

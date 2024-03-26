import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import PageLayout from "@/components/PageLayout";

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
      <PageLayout className="relative z-20 min-h-screen bg-red-300">
        <h2>About</h2>
      </PageLayout>
      <PageLayout className="min-h-screen bg-slate-600">
        <h2>Project</h2>
      </PageLayout>
    </div>
  );
}

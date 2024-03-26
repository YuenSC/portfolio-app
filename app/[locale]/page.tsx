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
      <div className="sticky top-[var(--nav-bar-height)] z-0">
        <div className="absolute inset-0 bg-background brightness-90 dark:bg-gray-800" />
        <Hero />
      </div>

      <div className="relative z-20 w-full">
        <PageLayout className="bg-slate-600">
          <h2 className="text-3xl font-semibold">Projects</h2>
        </PageLayout>
        <PageLayout className="bg-red-100" id="about">
          <h2 className="text-3xl font-semibold">About</h2>
        </PageLayout>
      </div>
    </div>
  );
}

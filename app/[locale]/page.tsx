import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import PageLayout from "@/components/PageLayout";
import ProjectPage from "@/components/projects/ProjectPage";
import AboutPage from "@/components/about/AboutPage";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <>
      <NavBar locale={locale} />
      <div>
        <div className="sticky top-[var(--nav-bar-height)] z-0">
          <div className="absolute inset-0 bg-background brightness-90 dark:bg-gray-800" />
          <Hero />
        </div>

        <div className="relative z-20 w-full">
          <PageLayout
            className="min-h-screen bg-slate-600 text-white"
            id="project"
          >
            <ProjectPage />
          </PageLayout>
          <PageLayout
            className="bg-background pt-[var(--nav-bar-height)]"
            id="about"
          >
            <AboutPage />
          </PageLayout>
        </div>
      </div>
      <Footer />
    </>
  );
}

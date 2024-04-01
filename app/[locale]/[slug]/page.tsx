import RevolutHero from "@/components/revolut/RevolutHero";
import { SiteNameSlugEnum } from "@/lib/types/SiteNameSlugEnum";

export function generateStaticParams() {
  const params = Object.keys(SiteNameSlugEnum).map((siteNameSlug) => ({
    slug: siteNameSlug,
  }));

  return params;
}

export default function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: SiteNameSlugEnum };
}) {
  return <RevolutHero />;
}

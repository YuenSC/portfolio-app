import RevolutHero from "@/components/revolut/RevolutHero";
import { SiteNameSlugEnum } from "@/lib/types/SiteNameSlugEnum";

export function generateStaticParams() {
  const params = Object.keys(SiteNameSlugEnum).map((siteNameSlug) => ({
    slug: siteNameSlug,
  }));

  return params;
}

export default async function Page(
  props: {
    params: Promise<{ locale: string; slug: SiteNameSlugEnum }>;
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  return <RevolutHero />;
}

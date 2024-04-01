import { SiteNameSlugEnum } from "@/lib/types/SiteNameSlugEnum";

export function generateStaticParams() {
  const params = Object.keys(SiteNameSlugEnum).map((siteNameSlug) => ({
    slug: siteNameSlug,
  }));

  console.log("params", params);
  return params;
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <div>Page</div>;
}

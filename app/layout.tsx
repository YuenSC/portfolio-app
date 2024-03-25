import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale?: string };
}) {
  const t = await getTranslations({
    locale: locale ?? "en",
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      locale,
      title: t("title"),
      siteName: t("title"),
      description: t("description"),
      images: [
        {
          type: "image/jpeg",
          url:
            locale === "en"
              ? "https://campaign.mcdonalds.com.hk/en/promotions/ShakeAndDip/images/og.jpg"
              : "https://campaign.mcdonalds.com.hk/ch/promotions/ShakeAndDip/images/og.jpg",
        },
      ],
    },
  } as Metadata;
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}

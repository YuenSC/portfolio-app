import { locales } from "@/lib/i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import "./globals.css";
import { poppins } from "@/lib/fonts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
    openGraph: {
      type: "website",
      locale,
      title: t("Metadata.title"),
      siteName: t("Metadata.title"),
      description: t("Metadata.description"),
    },
  } as Metadata;
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <main>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
          <GoogleAnalytics gaId="G-8WL0B2M97P" />
        </main>
      </body>
    </html>
  );
}
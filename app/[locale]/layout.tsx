import { use } from "react";
import { locales } from "@/lib/i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
    // openGraph: {
    //   type: "website",
    //   locale,
    //   title: t("Metadata.title"),
    //   siteName: t("Metadata.title"),
    //   description: t("Metadata.description"),
    // },
  } as Metadata;
}

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
  }>
) {
  const params = use(props.params);

  const {
    locale
  } = params;

  const {
    children
  } = props;

  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
            <GoogleAnalytics gaId="G-8WL0B2M97P" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

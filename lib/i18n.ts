import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

// Can be imported from a shared config

export enum LocaleEnum {
  en = "en",
  zh = "zh-HK",
  jp = "ja",
}

export const locales = [LocaleEnum.en, LocaleEnum.zh, LocaleEnum.jp];
export const localesWithLabel = [
  {
    locale: LocaleEnum.en,
    label: "English",
  },
  {
    locale: LocaleEnum.zh,
    label: "繁體中文",
  },
  {
    locale: LocaleEnum.jp,
    label: "日本語",
  },
];
// export const localePrefix = "always"; // Default

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix: "always" });

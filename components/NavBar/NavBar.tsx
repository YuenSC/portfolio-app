import { useTranslations } from "next-intl";
import Link from "next/link";
import { memo, useMemo } from "react";
import DarkModeToggle from "../DarkModeToggle";
import LanguageToggle from "../LanguageToggle";
import NavBarContactDropdown from "./NavBarContactDropdown";
import NavBarNavList from "./NavBarNavList";
import NavBarSheet from "./NavBarSheet";
import NavBarTitle from "./NavBarTitle";

export type NavItem = {
  isExternal: boolean;
  href: string;
  label: string;
};

const NavBar = ({ locale }: { locale: string }) => {
  const t = useTranslations();

  const routes = useMemo(() => {
    return [
      {
        href: `/#`,
        label: t("NavBar.intro"),
        isExternal: false,
      },
      {
        href: `/#project`,
        label: t("NavBar.project"),
        isExternal: false,
      },
      {
        href: `/#about`,
        label: t("NavBar.aboutMe"),
        isExternal: false,
      },
      // {
      //   href: MyPortfolioUrl,
      //   isExternal: true,
      //   label: t("NavBar.source"),
      // },
    ] satisfies NavItem[];
  }, [t]);

  return (
    <div className="sticky top-0 z-40">
      <div className="absolute -z-20 h-[100%] w-full bg-background"></div>

      <div className="container flex h-[var(--nav-bar-height)] items-center justify-between px-4">
        <Link href={`/${locale}`}>
          <NavBarTitle nameClassName="hidden md:block" />
        </Link>

        <div className="flex items-center gap-3">
          <NavBarNavList routes={routes} />
          <NavBarContactDropdown />
          <DarkModeToggle />
          <LanguageToggle />
          <NavBarSheet routes={routes} />
        </div>
      </div>
    </div>
  );
};

export default memo(NavBar);

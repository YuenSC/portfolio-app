import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MyPortfolioUrl } from "@/lib/constants";
import { Menu, PanelTopCloseIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { memo, useMemo } from "react";
import RippleEffect from "../RippleEffect";
import { Button } from "../ui/button";
import NavBarTitle from "./NavBarTitle";
import DarkModeToggle from "../DarkModeToggle";

const NavBar = ({ locale }: { locale: string }) => {
  const t = useTranslations();

  const routes = useMemo(() => {
    return [
      {
        href: "/",
        label: t("NavBar.home"),
        isExternal: false,
      },
      {
        href: MyPortfolioUrl,
        isExternal: true,
        label: t("NavBar.source"),
      },
    ] as {
      isExternal: boolean;
      href: string;
      label: string;
    }[];
  }, [t]);

  return (
    <div className="sticky top-0 z-40">
      <div className="absolute left-[-5%] top-[-13%] -z-20 h-[120%] w-[120%] bg-background opacity-75 blur-sm"></div>

      <div className="container flex h-[var(--nav-bar-height)] items-center justify-between px-4">
        <Link href={`/${locale}`}>
          <NavBarTitle />
        </Link>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <Drawer direction="top">
            <DrawerTrigger asChild className="md:hidden">
              <Menu />
            </DrawerTrigger>
            <DrawerContent className="bottom-12">
              <DrawerHeader>
                <DrawerTitle>
                  <NavBarTitle />
                </DrawerTitle>
              </DrawerHeader>

              <div className="px-6">
                {routes.map((route, index) => {
                  return (
                    <RippleEffect key={index} className="py-2">
                      <a
                        href={route.href}
                        target={route.isExternal ? "_blank" : "_self"}
                        className="block text-lg text-gray-800 hover:text-gray-900"
                      >
                        {route.label}
                      </a>
                    </RippleEffect>
                  );
                })}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button size="icon" variant="ghost" className="self-end">
                    <PanelTopCloseIcon />
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default memo(NavBar);

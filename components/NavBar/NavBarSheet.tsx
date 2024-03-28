"use client";

import { memo } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useHash from "@/lib/hooks/useHash";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import RippleEffect from "../RippleEffect";
import { NavItem } from "./NavBar";
import NavBarTitle from "./NavBarTitle";

const NavBarSheet = ({ routes }: { routes: NavItem[] }) => {
  const hash = useHash();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between space-y-0">
          <SheetTitle>
            <NavBarTitle />
          </SheetTitle>

          <SheetClose asChild className="cursor-pointer">
            <X />
          </SheetClose>
        </SheetHeader>

        <div className="mt-6">
          {routes.map((route, index) => {
            return (
              <RippleEffect key={index} className="py-2">
                <SheetClose asChild>
                  <Link
                    href={route.href}
                    target={route.isExternal ? "_blank" : "_self"}
                    className="block text-lg text-gray-800 dark:text-white"
                  >
                    {route.label}
                  </Link>
                </SheetClose>
              </RippleEffect>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default memo(NavBarSheet);

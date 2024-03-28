"use client";

import { memo, useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, PanelTopCloseIcon } from "lucide-react";
import Link from "next/link";
import RippleEffect from "../RippleEffect";
import { Button } from "../ui/button";
import { NavItem } from "./NavBar";
import NavBarTitle from "./NavBarTitle";
import useHash from "@/lib/hooks/useHash";

const NavBarDrawer = ({ routes }: { routes: NavItem[] }) => {
  const hash = useHash();

  return (
    <Drawer direction="top" modal={false} preventScrollRestoration={true}>
      <DrawerTrigger asChild className="cursor-pointer md:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <NavBarTitle />
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-6">
          {routes.map((route, index) => {
            return (
              <RippleEffect key={index} className="py-2">
                <DrawerClose asChild>
                  <Link
                    href={route.href}
                    target={route.isExternal ? "_blank" : "_self"}
                    className="block text-lg text-gray-800 dark:text-white"
                  >
                    {route.label}
                  </Link>
                </DrawerClose>
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
  );
};

export default memo(NavBarDrawer);

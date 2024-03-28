"use client";

import useHash from "@/lib/hooks/useHash";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import { NavItem } from "./NavBar";

const NavBarNavList = ({ routes }: { routes: NavItem[] }) => {
  const hash = useHash();

  return (
    <nav className="mr-8 hidden gap-4 lg:flex">
      {routes.map((route, index) => {
        const hashInRoute = route.isExternal
          ? undefined
          : route.href.split("#")[1] ?? "";

        return (
          <Link
            key={index}
            href={route.href}
            target={route.isExternal ? "_blank" : "_self"}
            className="group relative"
          >
            <div
              className={cn(
                "absolute bottom-0 h-0 w-full bg-background-reversed transition-[height] group-hover:h-full",
                hashInRoute === (hash?.split("#")[1] ?? "") && "h-0.5",
              )}
            />

            <p className="border-background-reversed px-2 text-lg text-white mix-blend-difference">
              {route.label}
            </p>
          </Link>
        );
      })}
    </nav>
  );
};

export default memo(NavBarNavList);

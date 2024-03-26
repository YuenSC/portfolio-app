"use client";

import { memo } from "react";
import { NavItem } from "./NavBar";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NavBarNavList = ({ routes }: { routes: NavItem[] }) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname", pathname);

  return (
    <nav className="mr-8 hidden gap-4 md:flex">
      {routes.map((route, index) => {
        return (
          <Link
            key={index}
            href={route.href}
            target={route.isExternal ? "_blank" : "_self"}
            className="group relative"
          >
            <div
              className={cn(
                "bg-background-reversed absolute bottom-0 h-0 w-full transition-[height] group-hover:h-full",
                pathname === route.href && "h-0.5",
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

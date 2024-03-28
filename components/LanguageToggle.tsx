"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { localesWithLabel } from "@/lib/i18n";
import { memo, useCallback } from "react";
import Link from "next/link";

const LanguageToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleClick = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" onClick={handleClick}>
          <LanguagesIcon />
          <span className="sr-only">Select Languages</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {localesWithLabel.map(({ locale, label }) => (
          <DropdownMenuItem
            key={locale}
            asChild
            className="text-black dark:text-white"
          >
            <Link href={`/${locale}`} scroll={false}>
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(LanguageToggle);

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { memo } from "react";

const NavBarTitle = ({ nameClassName }: { nameClassName?: string }) => {
  const t = useTranslations();

  return (
    <motion.div
      whileTap={{ rotate: -4, scale: 1.05 }}
      className="flex items-center gap-1"
    >
      <Image
        src="/icon/favicon-32x32.png"
        alt="favicon"
        width={32}
        height={32}
        className="dark:hidden"
      />
      <Image
        src="/icon-dark/favicon-32x32.png"
        alt="favicon"
        width={32}
        height={32}
        className="hidden dark:block"
      />
      <p className={cn("text-xl font-semibold", nameClassName)}>
        {t("Home.name")}
      </p>
    </motion.div>
  );
};

export default memo(NavBarTitle);

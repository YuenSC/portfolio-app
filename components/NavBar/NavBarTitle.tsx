"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

const NavBarTitle = () => {
  return (
    <motion.div
      whileTap={{ rotate: -4, scale: 1.05 }}
      className="flex items-center gap-1"
    >
      <Image
        src="icon/favicon-32x32.png"
        alt="favicon"
        width={32}
        height={32}
        className="dark:hidden"
      />
      <Image
        src="icon-dark/favicon-32x32.png"
        alt="favicon"
        width={32}
        height={32}
        className="hidden dark:block"
      />
      <p className="text-xl font-semibold">Calvin Yuen</p>
    </motion.div>
  );
};

export default memo(NavBarTitle);

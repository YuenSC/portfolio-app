"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      />
      <p className="text-xl font-semibold">Calvin Yuen</p>
    </motion.div>
  );
};

export default memo(NavBarTitle);

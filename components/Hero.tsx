"use client";

import { motion } from "framer-motion";
import { ArrowDownFromLineIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { memo } from "react";

const Hero = () => {
  const t = useTranslations();

  return (
    <div className="relative flex min-h-[calc(100svh-var(--nav-bar-height))] w-full items-center">
      <div className="relative -mt-8 flex w-full flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-full border-4 border-black dark:border-white xl:max-w-[350px]"
        >
          <Image src="self-photo.jpg" alt="Calvin Yuen's image" fill />
        </motion.div>

        <div className="-mt-12 w-full overflow-hidden bg-background lg:-mt-24">
          <div className="flex">
            {Array.from(Array(10).keys()).map((_, index) => (
              <p
                key={index}
                className="animate-infinite-scrolling-text whitespace-nowrap px-6 text-6xl italic text-white mix-blend-difference dark:text-white lg:text-9xl"
              >
                {t("Home.name")}
              </p>
            ))}
          </div>
          <div className="text-center italic text-black dark:text-white lg:text-xl">
            {t("Home.frontend-developer")}
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 flex w-full items-center justify-center">
        <motion.div
          animate={{
            y: [0, 10, 0],
            transition: {
              repeat: Infinity,
            },
          }}
          className="cursor-pointer"
          onClick={() => {
            const aboutElement = document.getElementById("about");
            aboutElement?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ArrowDownFromLineIcon />
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Hero);

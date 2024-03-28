"use client";

import { Variants, motion } from "framer-motion";
import { ArrowDownFromLineIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { memo } from "react";
import { BackgroundBeams } from "./ui/background-beams";

const listVariants: Variants = {
  hidden: {
    clipPath: "polygon(100% 0, 100% 0, 32% 0, 0 0, 0 0)",
  },
  visible: {
    clipPath: [
      "polygon(100% 0, 100% 40%, 32% 60%, 0 40%, 0 0)",
      "polygon(100% 0, 100% 40%, 32% 60%, 0 40%, 0 0)",
      "polygon(100% 0, 100% 100%, 32% 100%, 0 100%, 0 0)",
    ],
    transition: {
      duration: 0.8,
      times: [0.4, 0.6, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.5,
    },
  },
};

const Hero = () => {
  const t = useTranslations();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={listVariants}
      className="relative flex min-h-[calc(100svh-var(--nav-bar-height))] w-full bg-background"
    >
      <motion.div className="relative -mt-8 flex w-full flex-col items-center justify-center">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-full border-4 border-black xl:max-w-[350px] dark:border-white"
        >
          <Image src="self-photo.jpg" alt="Calvin Yuen's image" fill />
        </motion.div>

        <div className="-mt-12 w-full overflow-hidden lg:-mt-24">
          <div className="flex">
            {Array.from(Array(10).keys()).map((_, index) => (
              <p
                key={index}
                className="animate-infinite-scrolling-text whitespace-nowrap px-6 text-6xl italic text-white mix-blend-difference lg:text-9xl dark:text-white"
              >
                {t("Home.name")}
              </p>
            ))}
          </div>
          <div className="text-center italic text-black lg:text-xl dark:text-white">
            {t("Home.frontend-developer")}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-7 flex w-full items-center justify-center"
      >
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
      </motion.div>
      <BackgroundBeams className="hidden dark:block" />
    </motion.div>
  );
};

export default memo(Hero);

"use client";

import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="flex min-h-[80vh] items-center">
      <div className="relative -mt-8 flex w-full flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-full border-4 border-black shadow-lg dark:border-white xl:max-w-[350px]"
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
                Calvin YUEN
              </p>
            ))}
          </div>
          <div className="text-center italic text-black dark:text-white lg:text-xl">
            Frontend Developer
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);

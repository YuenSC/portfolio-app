"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 3);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-0.2 start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.4], [-50, -50, 800], {
      clamp: false,
    }),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0.1, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [-500, 0]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse gap-4 space-x-reverse md:gap-20 ">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const t = useTranslations();
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="container mx-auto w-full px-4 py-12"
    >
      <h1 className="whitespace-pre-line text-2xl font-bold md:text-7xl dark:text-white">
        {t("ProjectPage.some-interesting-nside-projects")}
      </h1>
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        {t("ProjectPage.description")}
      </p>
    </motion.div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link?: string;
    thumbnail?: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative aspect-video w-[60vw] min-w-[30rem] flex-shrink-0"
    >
      {product.link && product.thumbnail ? (
        <Link
          href={product.link}
          className="block group-hover/product:shadow-2xl "
        >
          <div className="absolute h-full w-full">
            <Image
              src={product.thumbnail}
              fill
              className="object-cover object-left-top"
              alt={product.title}
            />
          </div>
        </Link>
      ) : (
        <div className="flex h-full items-center justify-center border-4 border-background-reversed bg-black bg-opacity-50">
          <h3 className="whitespace-pre-line text-center text-3xl font-bold">
            {product.title}
          </h3>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};

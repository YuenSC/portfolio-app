"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLink } from "react-icons/fa";

const ProductCard = ({
  product,
}: {
  product: {
    title: string;
    link?: string;
    thumbnail?: string;
    github: string;
  };
}) => {
  return (
    <motion.div
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative aspect-video w-full flex-shrink-0 md:w-[45%]"
    >
      {product.thumbnail ? (
        <div className="block group-hover/product:shadow-2xl">
          <div className="absolute h-full w-full">
            <Image
              src={product.thumbnail}
              fill
              className="object-cover object-left-top"
              alt={product.title}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center border-4 border-background-reversed bg-black bg-opacity-50">
          <h3 className="whitespace-pre-line text-center text-3xl font-bold">
            {product.title}
          </h3>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80"></div>

      {/* md link  */}
      <div className="absolute bottom-4 left-4 hidden w-full flex-col gap-1 overflow-hidden text-white opacity-0 group-hover/product:opacity-100 md:flex">
        <h2 className="text-xl">{product.title}</h2>
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            className="flex items-center gap-2 hover:underline"
          >
            <FaLink />
            <h2>{product.link}</h2>
          </a>
        )}
        {product.github && (
          <a
            href={product.github}
            target="_blank"
            className="flex items-center gap-2 hover:underline"
          >
            <FaGithub />
            <h2>{product.github}</h2>
          </a>
        )}
      </div>

      {/* small screen icon link */}
      <div className="absolute flex h-full w-full items-center justify-center gap-8 opacity-0 group-hover/product:opacity-100 md:hidden">
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            className="text-white hover:text-primary"
          >
            <FaLink size={50} />
          </a>
        )}
        {product.github && (
          <a
            href={product.github}
            target="_blank"
            className="text-white hover:text-primary"
          >
            <FaGithub size={50} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

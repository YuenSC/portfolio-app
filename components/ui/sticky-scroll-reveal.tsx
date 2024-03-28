"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  Variant,
  Variants,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  partiallyVisible: {
    opacity: 0.3,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
    },
  },
};

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    subtitle?: ReactNode;
    description: ReactNode;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-40vh start", "1.2 end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map(
      (_, index) => index / (cardLength - 0.75), // TODO: not a good solution
    );

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div className="relative flex gap-x-10 rounded-md" ref={ref}>
      <div className="relative flex flex-1 items-start">
        <div>
          {content.map((item, index) => (
            <motion.div
              initial="hidden"
              animate={activeCard === index ? "visible" : "partiallyVisible"}
              variants={variants}
              key={item.title + index}
              className="mb-20 min-h-[250px]"
            >
              <h2 className="mb-2 w-fit rounded-2xl bg-background-reversed px-4 py-0.5 text-lg font-bold text-white lg:text-2xl dark:text-black">
                {item.title}
              </h2>
              {item.subtitle && (
                <h2 className="group/link text-lg font-bold lg:text-2xl">
                  {item.subtitle}
                </h2>
              )}
              <p className="mt-4 text-base lg:text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className={cn(
          "sticky top-[40%] hidden h-60 w-80 overflow-hidden rounded-md lg:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};

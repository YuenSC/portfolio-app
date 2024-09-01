import { cn } from "@/lib/utils";
import React, { PropsWithChildren, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const item = {
  hidden: {},
  show: {
    y: [0, -5, 0],
    scaleX: [1, 1.2, 0.8, 1.2, 1],
    scaleY: [1, 0.8, 1.2, 0.8, 1],
    color: ["#fff", "#f00", "#0f0", "#00f", "#fff"],
  },
};

const JumpText = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  const controls = useAnimationControls();

  const jumpTextArr = text.split("");

  return (
    <motion.div
      className={cn(className, "text-red-500")}
      initial="hidden"
      animate={controls}
      transition={{
        staggerChildren: 0.05,
      }}
      onHoverStart={() => controls.start("show")}
    >
      {jumpTextArr.map((char, index) => (
        <motion.span
          className="inline-block origin-bottom"
          key={char}
          variants={item}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default JumpText;

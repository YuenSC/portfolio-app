import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";
import { motion } from "framer-motion";

const highlight = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
  },
};

const text = {
  hidden: {
    fontWeight: "400",
  },
  visible: {
    fontWeight: "700",
  },
};

const HighlightText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn("relative inline-block h-fit w-fit", className)}>
      <motion.span
        style={{ originX: 0 }}
        variants={highlight}
        className="absolute inset-x-0 bottom-0 top-1/2 z-0 bg-slate-600"
      />
      <motion.span className="relative z-20 whitespace-nowrap" variants={text}>
        {children}
      </motion.span>
    </span>
  );
};

export default memo(HighlightText);

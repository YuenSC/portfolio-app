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
        className="absolute inset-x-0 bottom-0 top-1/2 z-0 bg-slate-100 dark:bg-slate-600"
      />
      <span className="relative z-20 whitespace-nowrap font-bold">
        {children}
      </span>
    </span>
  );
};

export default memo(HighlightText);

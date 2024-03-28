import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";
import { motion } from "framer-motion";

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
        initial={{ scaleX: 0 }}
        style={{ originX: 0 }}
        whileInView={{ scaleX: 1, transition: { delay: 0.3 } }}
        className="absolute inset-x-0 bottom-0 top-1/2 z-0 bg-slate-600"
      />
      <motion.span
        className="relative z-20 whitespace-nowrap"
        initial={{ fontWeight: "400" }}
        whileInView={{ fontWeight: "700", transition: { delay: 0.3 } }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default memo(HighlightText);

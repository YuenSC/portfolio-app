import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";

const PageLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn("relative z-10", className)}>{children}</div>;
};

export default memo(PageLayout);

import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";

const PageLayout = ({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <div
      className={cn("min-h-screen  pt-[var(--nav-bar-height)]", className)}
      id={id}
    >
      <div className={cn("container px-4")}>{children}</div>
    </div>
  );
};

export default memo(PageLayout);

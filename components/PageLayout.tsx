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
    <section className={cn(className)} id={id}>
      {children}
    </section>
  );
};

export default memo(PageLayout);

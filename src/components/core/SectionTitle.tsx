import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps {
  className?: string;
  children: React.ReactNode;
}
const SectionTitle = ({ className, children }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold text-green-950 lg:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;

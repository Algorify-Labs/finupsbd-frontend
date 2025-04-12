import { cn } from "@/lib/utils";
import React from "react";

interface SectionBadgeProps {
  className?: string;
  children: React.ReactNode;
}

const SectionBadge = ({ className, children }: SectionBadgeProps) => {
  return (
    <h2
      className={cn(
        "relative mb-0 inline-block pb-6 text-lg font-medium text-green-950 before:absolute before:bottom-4 before:left-0 before:right-0 before:h-1 before:w-full lg:mb-4",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default SectionBadge;

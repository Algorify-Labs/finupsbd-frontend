import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  className?: string;
  children: React.ReactNode;
}
const SectionWrapper = ({ className, children }: SectionWrapperProps) => {
  return <section className={cn("py-8", className)}>{children}</section>;
};

export default SectionWrapper;

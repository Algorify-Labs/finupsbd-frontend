import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.png";

interface LogoProps {
  className?: string;
}

const SiteLogo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image src={logo} alt="Finups BD Logo" className={cn("", className)} />
    </Link>
  );
};

export default SiteLogo;

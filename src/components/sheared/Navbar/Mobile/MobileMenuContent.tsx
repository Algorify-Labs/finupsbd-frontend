// app/components/MobileMenuContent.tsx
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Globe } from "lucide-react";
import Link from "next/link";
import MenuItems from "./MenuItems";

export default function MobileMenuContent() {
  return (
    <SheetContent side="left" className="w-80 py-6">
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <Link href="/track-application" className="!text-xl">
        <Button variant="outline" className="h-10">
          <Globe className="h-14 w-14 text-6xl" />
          Track Application
        </Button>
      </Link>
      <MenuItems />
    </SheetContent>
  );
}

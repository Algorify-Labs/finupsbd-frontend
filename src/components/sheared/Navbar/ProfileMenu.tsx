"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  ChevronDownCircle,
  LogIn,
  LogOut,
  Package,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { protechedRoute } from "@/contants";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileMenu = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protechedRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-0">
            <div className="flex items-center justify-center gap-2">
              <Avatar>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="bg-primary">
                  <User className="text-white" />
                </AvatarFallback>
              </Avatar>
              <h2 className="text-base font-bold capitalize text-tertiary-dark">
                {user.name}
              </h2>
              <ChevronDownCircle className="test h-6 w-6" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom" // Position: top, bottom, left, right
            align="center" // Alignment: start, center, end
            sideOffset={22} // Distance from trigger
            className="w-48 text-tertiary-dark" // Customize width if needed
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Package className="mr-2 h-4 w-4" />
              <Link
                href="/user/my-application/loan-application"
                className="cursor-pointer"
              >
                My Application
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Bookmark className="mr-2 h-4 w-4" />
              <Link href="/user/saved-products" className="cursor-pointer">
                Saved Products
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user?.role === "USER" && (
              <Link href="/user/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
            )}

            {user?.role === "SUPER_ADMIN" && (
              <Link href="/super-admin/dashboard">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer rounded-md bg-red-primary text-white hover:bg-red-dark"
              onClick={handleLogOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href="/login" className="gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ProfileMenu;

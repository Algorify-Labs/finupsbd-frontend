"use client";

import { useState } from "react";
import { Bell, Globe, LogOut, Moon, Search, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { protechedRoute } from "@/contants";
import Link from "next/link";
import Image from "next/image";

export function AdminHeader() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  // Uncomment and configure your theme provider if needed:
  // const { theme, setTheme } = useTheme();

  // New state for language selection and notifications count
  const [language, setLanguage] = useState("en");
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protechedRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />

      {/* Brand Name */}
      <Link href="/super-admin/dashboard" className="text-2xl font-bold hidden sm:block">
        FinupsBD
      </Link>

      <div className="flex-1 hidden md:flex md:gap-4 lg:gap-8">
        <form className="flex-1 md:max-w-sm lg:max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle Button (currently inactive) */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full relative"
          // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Language Selector */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Globe className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Language menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLanguage("en")}>
              English {language === "en" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("bn")}>
              Bangla {language === "bn" && "✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Notifications Button with Badge */}
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-600" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Dropdown Menu with Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              {user?.avater ? (
                <Image
                  src={user.avater}
                  alt="User Avatar"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <User className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer bg-red-600 text-white"
              onClick={handleLogOut}
            >
              <LogOut className="mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;

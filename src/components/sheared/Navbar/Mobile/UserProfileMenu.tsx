import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { protechedRoute } from "@/contants";
import { logout } from "@/services/AuthService";
import { TUser } from "@/types/user";
import { Heart, LogOut, Settings,  User,  User2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TbChecklist } from "react-icons/tb";



const MobileUserProfileMenu = ({ user, setIsLoading }: { user: TUser; setIsLoading: (isLoading: boolean) => void }) => {
  const pathname = usePathname();
  const router = useRouter();
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
      <SheetContent side="left" className="w-80 py-6">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mb-3 flex items-center gap-2">
          <Avatar className="">
            <AvatarImage src={user?.avater} alt="User Image" />
            <AvatarFallback className="bg-primary">
              <User className="text-white" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold capitalize">{user.name}</h2>
        </div>
        <ul>
          <li className="group border-b border-[#F2F4F7] py-4">
            <Link
              href="/user/profile"
              className="flex w-full items-center gap-x-2"
            >
              <User2 className="text-2xl" />
              Profile
            </Link>
          </li>
          <li className="group border-b border-[#F2F4F7] py-4">
            <Link
              href="/user/my-application/loan-application"
              className="flex w-full items-center gap-x-2"
            >
              <TbChecklist className="text-2xl" />
              My Application
            </Link>
          </li>
          <li className="group border-b border-[#F2F4F7] py-4">
            <Link
              href="/user/saved-products"
              className="flex w-full items-center gap-x-2"
            >
              <Heart />
              Saved Products
            </Link>
          </li>
          <li className="group border-b border-[#F2F4F7] py-4">
            <Link
              href="/user/my-application/loan-application"
              className="flex w-full items-center gap-x-2"
            >
              <Settings />
              Settings
            </Link>
          </li>
          <li className="group border-b border-[#F2F4F7] py-4">
            <Button
              variant="destructive"
              className="bg-red-primary text-white"
              onClick={handleLogOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </li>
        </ul>
      </SheetContent>
    </div>
  );
};

export default MobileUserProfileMenu;

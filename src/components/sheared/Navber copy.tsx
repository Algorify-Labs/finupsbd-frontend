// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { protechedRoute } from "@/contants";
// import { useUser } from "@/context/UserContext";
// import { logout } from "@/services/AuthService";
// import {
//   Bookmark,
//   ChevronDown,
//   Globe,
//   LogIn,
//   LogOut,
//   Menu,
//   Package,
//   User,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { navItems } from "./navberConstant";
// import logo from "/public/logo.png";

// export default function Navbar() {
//   const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, setIsLoading } = useUser();

//   useEffect(() => {
//     setIsLoading(true);
//   }, []);

//   const handleLogOut = () => {
//     logout();
//     setIsLoading(true);
//     if (protechedRoute.some((route) => pathname.match(route))) {
//       router.push("/");
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex items-center gap-12">
//             <Link href="/" className="flex items-center space-x-2">
//               <Image src={logo} alt="Finups BD Logo" className="" />
//             </Link>
//             {/* dextop navber */}
//             <div className="hidden items-center gap-6 md:flex">
//               {navItems.map((item) => (
//                 <div
//                   key={item.title}
//                   className="group relative"
//                   onMouseEnter={() => setHoveredMenu(item.title)}
//                   onMouseLeave={() => setHoveredMenu(null)}
//                 >
//                   <Link
//                     href={item.href}
//                     className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-tertiary-primary transition-colors duration-200 hover:bg-gray-50 hover:text-tertiary-dark"
//                   >
//                     {item.icon && <item.icon className="h-5 w-5" />}
//                     {item.title}
//                     {item.items && (
//                       <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
//                     )}
//                   </Link>

//                   {item.items && (
//                     <div
//                       className={`absolute left-0 top-full w-48 origin-top rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 ${hoveredMenu === item.title ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
//                     >
//                       {item.items.map((subItem) => (
//                         <Link
//                           key={subItem.name}
//                           href={subItem.href}
//                           className="group/subitem flex items-center gap-3 px-4 py-2.5 text-tertiary-primary transition-colors duration-200 hover:text-tertiary-dark"
//                         >
//                           {subItem.icon && (
//                             <subItem.icon className="h-5 w-5 text-tertiary-primary group-hover/subitem:text-tertiary-dark" />
//                           )}
//                           <div>
//                             <span className="block text-sm">
//                               {subItem.name}
//                             </span>
//                             {subItem.description && (
//                               <span className="mt-0.5 block text-xs text-gray-500">
//                                 {subItem.description}
//                               </span>
//                             )}
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <Button variant="ghost" className="hidden gap-2 md:flex" asChild>
//               <Link href="/track-application">
//                 <Globe className="h-4 w-4" />
//                 Track Application
//               </Link>
//             </Button>

//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger>
//                   <div className="flex items-center justify-center gap-2">
//                     <Avatar>
//                       <AvatarImage src="https://github.com/shadcn.png" />
//                       <AvatarFallback>User</AvatarFallback>
//                     </Avatar>
//                     <h2 className="font-bold">{user.name}</h2>
//                     <ChevronDown className="h-4 w-4" />
//                   </div>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent>
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>
//                     <Package className="mr-2 h-4 w-4" />
//                     <Link href="/user/my-application/loan-application">
//                       My Application
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <Bookmark className="mr-2 h-4 w-4" />
//                     <Link href="/user/saved-products">Saved Products</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   {user?.role === "USER" && (
//                     <Link href="/user/profile">
//                       <DropdownMenuItem>
//                         <User className="mr-2 h-4 w-4" />
//                         Profile
//                       </DropdownMenuItem>
//                     </Link>
//                   )}

//                   {user?.role === "SUPER_ADMIN" && (
//                     <Link href="/super-admin/dashboard">
//                       <DropdownMenuItem>
//                         <User className="mr-2 h-4 w-4" />
//                         Dashboard
//                       </DropdownMenuItem>
//                     </Link>
//                   )}

//                   {user?.role === "ADMIN" && (
//                     <Link href="/admin">
//                       <DropdownMenuItem>
//                         <User className="mr-2 h-4 w-4" />
//                         Dashboard
//                       </DropdownMenuItem>
//                     </Link>
//                   )}

//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     className="cursor-pointer bg-red-600 text-white"
//                     onClick={handleLogOut}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Button asChild>
//                 <Link href="/login" className="gap-2">
//                   <LogIn className="h-4 w-4" />
//                   Sign In
//                 </Link>
//               </Button>
//             )}

//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger>
//                 <Menu className="h-6 w-6" />
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px]">
//                 <SheetHeader>
//                   <SheetTitle className="text-left">Menu</SheetTitle>
//                 </SheetHeader>

//                 <div className="mt-6 space-y-4">
//                   {navItems.map((item) => (
//                     <div key={item.title} className="space-y-2">
//                       <Link
//                         href={item.href}
//                         className="font-medium text-gray-900 hover:text-green-600"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {item.title}
//                       </Link>
//                       <div className="ml-2 space-y-2">
//                         {item.items?.map((subItem) => (
//                           <Link
//                             key={subItem.name}
//                             href={subItem.href}
//                             className="block text-sm text-gray-700 hover:text-green-600"
//                             onClick={() => setIsOpen(false)}
//                           >
//                             {subItem.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                   <Button
//                     variant="outline"
//                     className="mt-4 w-full gap-2"
//                     asChild
//                   >
//                     <Link href="/track-application">
//                       <Globe className="h-4 w-4" />
//                       Track Application
//                     </Link>
//                   </Button>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

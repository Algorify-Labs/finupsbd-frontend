import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { navItems } from "../navberConstant";

// Define the types for our navigation links
type NavItem = {
  name: string;
  href: string;
};

type NavLinkType = {
  title: string;
  href: string;
  subItems: NavItem[];
};

// This is our main Navbar component
const MenuItems = ({ hasSidebar }: { hasSidebar: boolean }) => {
  return (
    <Menubar className="nav gap-1 border-none 2xl:gap-2">
      {!hasSidebar && (
        <Link href="/" className="pr-2 text-accent-foreground">
          Home
        </Link>
      )}

      {navItems.map((navLink, index) => (
        <MenubarMenu key={index}>
          <div className="group relative">
            {/* Make the trigger not actually open the dropdown */}
            <MenubarTrigger className="cursor-pointer px-1 text-sm data-[state=open]:bg-transparent 2xl:px-2 2xl:text-base">
              {navLink.title}
              <ChevronDown className="ml-1 h-5 w-5 stroke-tertiary-dark transition-transform duration-200 group-hover:rotate-180" />
            </MenubarTrigger>

            {/* Custom dropdown that appears on hover */}
            {/* <div className="opacity-1 absolute left-[12px] top-full z-50 transition-all duration-300 group-hover:visible group-hover:opacity-100"> */}
            <div className="invisible absolute !top-full left-[12px] z-50 w-full opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <div className="pt-2">
                <div className="min-w-60 rounded-md border border-gray-primary bg-white p-2 shadow-md">
                  <div className="py-1">
                    {navLink.subItems?.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="group/subitem block px-4 py-2 text-base text-tertiary-primary transition-colors duration-200 hover:bg-green-100 hover:text-tertiary-dark"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default MenuItems;

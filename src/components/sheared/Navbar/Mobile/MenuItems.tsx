import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { navItems } from "../../navberConstant";
type NavItem = {
  name: string;
  href: string;
};

type NavLinkType = {
  title: string;
  href: string;
  subItems: NavItem[];
};
const MenuItems = () => {
  return (
    <div className="mt-4">
      {navItems.map((navItem, index) => (
        <Collapsible key={index} className="group/collapsible">
          <CollapsibleTrigger className="group flex w-full items-center justify-between border-b border-[#F2F4F7] py-4">
            {navItem.icon && (
              <navItem.icon className="mr-3 h-6 w-6 text-[20px]" />
            )}
            {navItem.title}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="CollapsibleContent mt-2">
            {navItem?.subItems?.map(({ name, href }, index) => (
              <Link key={index} href={href} className="block px-5 py-2">
                {name}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default MenuItems;

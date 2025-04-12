"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  LineChart,
  Settings,
  ShieldCheck,
  Users,
  Building,
  BookOpen,
  MessageSquare,
  Award,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Check if the current path matches or starts with the provided href
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  // Sidebar configuration with groups and items
  const sidebarConfig = [
    {
      group: null,
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/super-admin/dashboard",
        },
        {
          label: "Applications",
          icon: FileText,
          href: "/super-admin/applications",
        },
        {
          label: "KYC Verify",
          icon: FileText,
          href: "/super-admin/kyc",
        },
        {
          label: "Users",
          icon: Users,
          href: "/super-admin/users",
        },
      ],
    },
    {
      group: "Add Loans",
      items: [
        {
          label: "Personal Loans",
          icon: CreditCard,
          href: "/super-admin/loans/personalLoan",
        },
      ],
    },
    {
      group: "See All Loans",
      items: [
        {
          label: "All Personal Loans",
          icon: CreditCard,
          href: "/super-admin/loans/see-all-loans/all-personal-loans",
        },
      ],
    },
    {
      group: "Banks",
      items: [
        {
          label: "Banks Info",
          icon: Building,
          href: "/super-admin/banks",
        },
      ],
    },
    {
      group: "Product Management",
      items: [
        {
          label: "Financial Products",
          icon: CreditCard,
          href: "/super-admin/products",
        },
        {
          label: "Banks & Institutions",
          icon: Building,
          href: "/super-admin/banks",
        },
      ],
    },
    {
      group: "Content Management",
      items: [
        {
          label: "Educational Content",
          icon: BookOpen,
          href: "/super-admin/content",
        },
        {
          label: "Community",
          icon: MessageSquare,
          href: "/super-admin/community",
        },
      ],
    },
    {
      group: "Analytics",
      items: [
        {
          label: "User Analytics",
          icon: BarChart3,
          href: "/super-admin/user-analytices",
        },
        {
          label: "Product Analytics",
          icon: LineChart,
          href: "/super-admin/analytics/products",
        },
      ],
    },
    // {
    //   group: "Additional Features",
    //   items: [
    //     {
    //       label: "Rewards Program",
    //       icon: Award,
    //       href: "/super-admin/rewards",
    //     },
    //     {
    //       label: "Language Settings",
    //       icon: Globe,
    //       href: "/super-admin/languages",
    //     },
    //   ],
    // },
  ];

  return (
    <Sidebar
      className={`min-h-screen bg-white shadow-lg transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      <SidebarHeader className="flex items-center justify-between h-16 border-b px-4">
        <Link
          href="/super-admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <ShieldCheck className="h-6 w-6 text-primary" />
          {!collapsed && <span className="text-lg font-bold">FinUpBD Admin</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </SidebarHeader>

      <SidebarContent className="py-4 overflow-y-auto">
        {sidebarConfig.map((group, groupIndex) => {
          if (!group.group) {
            return (
              <SidebarMenu key={`group-${groupIndex}`}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        className="flex items-center gap-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary px-4 py-2"
                      >
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className="flex items-center"
                        >
                          <Icon className="h-5 w-5" />
                          {!collapsed && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            );
          }

          return (
            <div key={`group-${groupIndex}`}>
              <SidebarSeparator />
              <SidebarGroup>
                {!collapsed && (
                  <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    {group.group}
                  </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive(item.href)}
                            className="flex items-center gap-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary px-4 py-2"
                          >
                            <Link
                              href={item.href}
                              aria-current={isActive(item.href) ? "page" : undefined}
                              className="flex items-center"
                            >
                              <Icon className="h-5 w-5" />
                              {!collapsed && <span>{item.label}</span>}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/super-admin/settings")}
              className="flex items-center gap-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary px-4 py-2"
            >
              <Link
                href="/super-admin/settings"
                aria-current={isActive("/super-admin/settings") ? "page" : undefined}
                className="flex items-center"
              >
                <Settings className="h-5 w-5" />
                {!collapsed && <span>Settings</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;

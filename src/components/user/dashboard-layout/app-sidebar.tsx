"use client";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import SiteLogo from "@/components/sheared/SiteLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/user/dashboard-layout/nav-main";

// Sample data with teams, main navigation and projects.
const data = {
  teams: [
    {
      name: "Finups BD",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "My Application",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Loan Application",
          url: "/user/loan-application",
        },
        {
          title: "Application Status",
          url: "/user/my-application/application-status",
        },
        {
          title: "Cards",
          url: "#",
        },
        {
          title: "Bima/Insurance",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user/setting",
      icon: Settings2,
      items: [
        {
          title: "Change Password",
          url: "/user/setting/update-password",
        },
        {
          title: "Update Email/Mobile",
          url: "/user/setting/update-email-mobile",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Profile",
      url: "#",
      icon: Frame,
    },
    {
      name: "Saved Products",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className="z-50">
      <Sidebar
        className="w-72 bg-white shadow-lg transition-all dark:bg-gray-900"
        collapsible="icon"
        {...props}
      >
        {/* Header */}
        <SidebarHeader className="border-b border-gray-200 p-4 dark:border-gray-700">
          <SiteLogo className="w-52" />
        </SidebarHeader>

        {/* Main Content */}
        <SidebarContent className="flex-1 overflow-y-auto">
          {/* Teams Section */}
          {/* {data.teams && (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xs font-semibold text-gray-500 uppercase">
                Teams
              </h3>
              <div className="mt-2 space-y-1">
                {data.teams.map((team, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <team.logo className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {team.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Navigation Section */}
          <NavMain items={data.navMain} />

          {/* Projects Section */}
          {data.projects && (
            <div className="mt-4 border-t border-gray-200 px-4 py-3 dark:border-gray-700">
              <h3 className="text-xs font-semibold uppercase text-gray-500">
                Projects
              </h3>
              <div className="mt-2 space-y-1">
                {data.projects.map((project, index) => (
                  <a
                    key={index}
                    href={project.url}
                    className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <project.icon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {project.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </SidebarContent>

        {/* Footer */}
        {/* <SidebarFooter className="border-t border-gray-200 p-4 dark:border-gray-700">
          <NavUser />
        </SidebarFooter> */}
        <SidebarRail />
      </Sidebar>
    </div>
  );
}

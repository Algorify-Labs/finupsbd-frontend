import Header from "@/components/sheared/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/user/dashboard-layout/app-sidebar";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Header /> */}
      <div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="ml-10">
            <Header hasSidebar={false} />
            <div className="p-12 pt-10">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/super-admin/super-admin-sidebar"
import { AdminHeader } from "@/components/super-admin/super-admin-header"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="">
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex flex-col w-full mx-auto">
          <AdminHeader />
          <div className="flex flex-1 overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}


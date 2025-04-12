import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/services/AuthService"


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/")
  }

  return <>{children}</>
}

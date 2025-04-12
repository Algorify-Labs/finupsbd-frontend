import { DashboardStats } from "@/components/super-admin/dashboard/dashboard-stats"
import { Overview } from "@/components/super-admin/dashboard/overview"
import { RecentApplications } from "@/components/super-admin/dashboard/recent-applications"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Platform activity for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest product applications submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentApplications />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


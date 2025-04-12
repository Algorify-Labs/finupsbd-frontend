
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { UserAnalyticsHeader } from "@/components/super-admin/user-analytics/user-analytics-header"
import { UserMetricsCards } from "@/components/super-admin/user-analytics/user-metrics-cards"
import { UserAnalyticsOverview } from "@/components/super-admin/user-analytics/user-analytics-overview"
import { UserSegmentation } from "@/components/super-admin/user-analytics/user-segmentation"
import { UserSessionsChart } from "@/components/super-admin/user-analytics/user-sessions-chart"
import { UserActivityTimeline } from "@/components/super-admin/user-analytics/user-activity-timeline"

export default function UserAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <UserAnalyticsHeader />

      <UserMetricsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <UserAnalyticsOverview />
        <UserSegmentation />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-background">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">User Overview</h3>
            <div className="h-[400px] w-full rounded-md bg-muted/20 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">User overview dashboard would render here</p>
                <p className="text-xs text-muted-foreground mt-1">Showing comprehensive user metrics and KPIs</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="sessions" className="space-y-4">
          <Card className="p-6">
            <UserSessionsChart />
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card className="p-6">
            <UserActivityTimeline />
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">User Engagement</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Engagement Score</h4>
                <div className="text-3xl font-bold">78/100</div>
                <p className="text-xs text-muted-foreground mt-1">Based on activity, frequency, and recency</p>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Engagement Trend</h4>
                <div className="flex items-center gap-1 text-emerald-500">
                  <span className="text-lg font-medium">+8.3%</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trending-up"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Compared to previous period</p>
              </div>

              <div className="h-[300px] w-full rounded-md bg-muted/20 flex items-center justify-center col-span-2">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Engagement metrics chart would render here</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="conversion" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Conversion Analysis</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Conversion Rate</h4>
                <div className="text-3xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground mt-1">Overall conversion rate</p>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Avg. Order Value</h4>
                <div className="text-3xl font-bold">$78.45</div>
                <p className="text-xs text-muted-foreground mt-1">Average purchase amount</p>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Lifetime Value</h4>
                <div className="text-3xl font-bold">$342.18</div>
                <p className="text-xs text-muted-foreground mt-1">Average customer LTV</p>
              </div>

              <div className="h-[300px] w-full rounded-md bg-muted/20 flex items-center justify-center col-span-3">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Conversion funnel visualization would render here</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


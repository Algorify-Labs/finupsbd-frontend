"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowDownToLine, ArrowUpFromLine, BarChart4, LineChart, PieChart } from "lucide-react"

export function UserAnalyticsOverview() {
  const [timeframe, setTimeframe] = useState("30days")
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line")
  const [comparisonMode, setComparisonMode] = useState<boolean>(false)
  const [comparisonUser, setComparisonUser] = useState<string | null>(null)

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>User Activity Overview</CardTitle>
            <CardDescription>Visualize user engagement patterns over time</CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className={chartType === "line" ? "bg-muted" : ""}
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={chartType === "bar" ? "bg-muted" : ""}
                onClick={() => setChartType("bar")}
              >
                <BarChart4 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={chartType === "area" ? "bg-muted" : ""}
                onClick={() => setChartType("area")}
              >
                <PieChart className="h-4 w-4" />
              </Button>
            </div>

            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-[250px]">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="7days">7D</TabsTrigger>
                <TabsTrigger value="30days">30D</TabsTrigger>
                <TabsTrigger value="90days">90D</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant={comparisonMode ? "default" : "outline"}
              size="sm"
              onClick={() => setComparisonMode(!comparisonMode)}
              className="gap-1"
            >
              {comparisonMode ? (
                <ArrowDownToLine className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpFromLine className="h-3.5 w-3.5" />
              )}
              {comparisonMode ? "Hide Comparison" : "Compare Users"}
            </Button>

            {comparisonMode && (
              <Select value={comparisonUser || ""} onValueChange={setComparisonUser}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select user to compare" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user_789012">Jane Smith</SelectItem>
                  <SelectItem value="user_345678">Robert Johnson</SelectItem>
                  <SelectItem value="user_901234">Emily Davis</SelectItem>
                  <SelectItem value="user_567890">Michael Wilson</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Metrics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="pageviews">Page Views</SelectItem>
              <SelectItem value="sessions">Sessions</SelectItem>
              <SelectItem value="conversions">Conversions</SelectItem>
              <SelectItem value="duration">Session Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ActivityChart
          chartType={chartType}
          timeframe={timeframe}
          comparisonMode={comparisonMode}
          comparisonUser={comparisonUser}
        />
      </CardContent>
    </Card>
  )
}

interface ActivityChartProps {
  chartType: "line" | "bar" | "area"
  timeframe: string
  comparisonMode: boolean
  comparisonUser: string | null
}

function ActivityChart({ chartType, timeframe, comparisonMode, comparisonUser }: ActivityChartProps) {
  // In a real implementation, this would be a chart component
  // For this example, we'll use a placeholder
  return (
    <div className="h-[350px] w-full rounded-md bg-muted/20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart would render here
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Showing data for the last{" "}
          {timeframe === "7days"
            ? "7 days"
            : timeframe === "30days"
              ? "30 days"
              : timeframe === "90days"
                ? "90 days"
                : "all time"}
        </p>
        {comparisonMode && (
          <p className="text-xs text-muted-foreground mt-1">
            Comparing with user:{" "}
            {comparisonUser
              ? comparisonUser === "user_789012"
                ? "Jane Smith"
                : comparisonUser === "user_345678"
                  ? "Robert Johnson"
                  : comparisonUser === "user_901234"
                    ? "Emily Davis"
                    : "Michael Wilson"
              : "None selected"}
          </p>
        )}
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MousePointer,
  ShoppingCart,
  UserCheck,
  RefreshCw,
  Smartphone,
  Globe,
  AlertCircle,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function UserMetricsCards() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Key Metrics</h2>
        <button
          onClick={refreshData}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-1 h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Sessions"
          value="127"
          change="+5.4%"
          trend="up"
          icon={Clock}
          description="Total number of user sessions"
          previousValue="120"
        />

        <MetricCard
          title="Avg. Session Duration"
          value="4m 32s"
          change="+12.3%"
          trend="up"
          icon={Clock}
          description="Average time spent per session"
          previousValue="4m 02s"
        />

        <MetricCard
          title="Page Views"
          value="843"
          change="+7.6%"
          trend="up"
          icon={MousePointer}
          description="Total number of page views"
          previousValue="783"
        />

        <MetricCard
          title="Conversions"
          value="12"
          change="-2.1%"
          trend="down"
          icon={ShoppingCart}
          description="Total number of conversions"
          previousValue="13"
        />

        <MetricCard
          title="Bounce Rate"
          value="32.4%"
          change="-3.8%"
          trend="up"
          icon={AlertCircle}
          description="Percentage of single-page sessions"
          previousValue="33.7%"
          trendInverted
        />

        <MetricCard
          title="Mobile Usage"
          value="68%"
          change="+4.2%"
          trend="up"
          icon={Smartphone}
          description="Percentage of mobile sessions"
          previousValue="65.3%"
        />

        <MetricCard
          title="Avg. Pages Per Session"
          value="6.2"
          change="+0.8%"
          trend="up"
          icon={Globe}
          description="Average pages viewed per session"
          previousValue="6.15"
        />

        <MetricCard
          title="Retention Rate"
          value="76%"
          change="+2.3%"
          trend="up"
          icon={UserCheck}
          description="Percentage of returning users"
          previousValue="74.3%"
        />
      </div>
    </>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  description: string
  previousValue: string
  trendInverted?: boolean
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
  previousValue,
  trendInverted = false,
}: MetricCardProps) {
  // If trendInverted is true, "down" is good and "up" is bad
  const isPositive = trendInverted ? trend === "down" : trend === "up"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`flex items-center ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                  {change}{" "}
                  {trend === "up" ? (
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="ml-1 h-3 w-3" />
                  )}
                </span>
                from previous period
              </p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            <p className="text-xs">Previous: {previousValue}</p>
            <p className="text-xs">Current: {value}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


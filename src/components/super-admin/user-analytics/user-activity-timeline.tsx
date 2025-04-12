"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download } from "lucide-react"

export function UserActivityTimeline() {
  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [timeRange, setTimeRange] = useState<string>("all")

  // Sample activity data
  const allActivities = [
    {
      id: 1,
      type: "login",
      timestamp: "Today, 10:32 AM",
      details: "Logged in from Chrome on Windows",
      ip: "192.168.1.1",
      location: "New York, USA",
      device: "Desktop",
      browser: "Chrome",
      os: "Windows 11",
    },
    {
      id: 2,
      type: "page_view",
      timestamp: "Today, 10:33 AM",
      details: "Viewed product page: Premium Plan",
      duration: "2m 15s",
      referrer: "Internal",
      path: "/products/premium",
    },
    {
      id: 3,
      type: "action",
      timestamp: "Today, 10:36 AM",
      details: "Added item to cart",
      item: "Premium Plan (Annual)",
      value: "$199.99",
    },
    {
      id: 4,
      type: "checkout",
      timestamp: "Today, 10:40 AM",
      details: "Started checkout process",
      abandoned: true,
      cart_value: "$199.99",
      items: 1,
    },
    {
      id: 5,
      type: "login",
      timestamp: "Yesterday, 3:15 PM",
      details: "Logged in from Safari on iPhone",
      ip: "192.168.1.2",
      location: "New York, USA",
      device: "Mobile",
      browser: "Safari",
      os: "iOS 16",
    },
    {
      id: 6,
      type: "page_view",
      timestamp: "Yesterday, 3:17 PM",
      details: "Viewed account settings",
      duration: "4m 32s",
      referrer: "Internal",
      path: "/account/settings",
    },
    {
      id: 7,
      type: "action",
      timestamp: "Yesterday, 3:22 PM",
      details: "Updated profile information",
      changes: ["Name", "Email", "Phone"],
    },
    {
      id: 8,
      type: "purchase",
      timestamp: "Last week, Tuesday",
      details: "Completed purchase",
      value: "$199.99",
      payment_method: "Credit Card",
      transaction_id: "TXN123456789",
    },
    {
      id: 9,
      type: "support",
      timestamp: "Last week, Monday",
      details: "Contacted support",
      channel: "Chat",
      topic: "Billing Question",
      duration: "8m 45s",
      resolved: true,
    },
    {
      id: 10,
      type: "feedback",
      timestamp: "2 weeks ago",
      details: "Submitted product feedback",
      rating: 4,
      comments: "Great product, but could use more customization options.",
    },
  ]

  // Filter activities based on selected filter
  const filteredActivities = allActivities.filter((activity) => {
    // Filter by type
    if (filter !== "all" && activity.type !== filter) {
      return false
    }

    // Filter by search query
    if (searchQuery && !activity.details.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by time range
    if (timeRange === "today" && !activity.timestamp.includes("Today")) {
      return false
    } else if (timeRange === "yesterday" && !activity.timestamp.includes("Yesterday")) {
      return false
    } else if (
      timeRange === "week" &&
      !activity.timestamp.includes("Today") &&
      !activity.timestamp.includes("Yesterday") &&
      !activity.timestamp.includes("Last week")
    ) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium">Activity Timeline</h3>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search activities..."
              className="w-full pl-8 sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="login">Logins</SelectItem>
              <SelectItem value="page_view">Page Views</SelectItem>
              <SelectItem value="action">Actions</SelectItem>
              <SelectItem value="checkout">Checkouts</SelectItem>
              <SelectItem value="purchase">Purchases</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="grid w-full max-w-[400px] grid-cols-3">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="map">Activity Map</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-8 pt-4">
          {filteredActivities.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No activities found</p>
                <Button
                  variant="link"
                  className="mt-2 text-xs"
                  onClick={() => {
                    setFilter("all")
                    setSearchQuery("")
                    setTimeRange("all")
                  }}
                >
                  Reset filters
                </Button>
              </div>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted bg-background">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="h-full w-px bg-border" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{activity.details}</p>
                    {activity.abandoned && (
                      <Badge variant="destructive" className="text-xs">
                        Abandoned
                      </Badge>
                    )}
                    {activity.resolved && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        Resolved
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {activity.type === "login"
                        ? "Login"
                        : activity.type === "page_view"
                          ? "Page View"
                          : activity.type === "action"
                            ? "Action"
                            : activity.type === "checkout"
                              ? "Checkout"
                              : activity.type === "purchase"
                                ? "Purchase"
                                : activity.type === "support"
                                  ? "Support"
                                  : activity.type === "feedback"
                                    ? "Feedback"
                                    : "Other"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.timestamp}</p>

                  <div className="grid grid-cols-1 gap-1 pt-1 text-xs text-muted-foreground sm:grid-cols-2">
                    {activity.ip && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">IP:</span> {activity.ip}
                      </div>
                    )}
                    {activity.location && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Location:</span> {activity.location}
                      </div>
                    )}
                    {activity.device && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Device:</span> {activity.device}
                      </div>
                    )}
                    {activity.browser && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Browser:</span> {activity.browser}
                      </div>
                    )}
                    {activity.os && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">OS:</span> {activity.os}
                      </div>
                    )}
                    {activity.duration && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Duration:</span> {activity.duration}
                      </div>
                    )}
                    {activity.referrer && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Referrer:</span> {activity.referrer}
                      </div>
                    )}
                    {activity.path && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Path:</span> {activity.path}
                      </div>
                    )}
                    {activity.item && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Item:</span> {activity.item}
                      </div>
                    )}
                    {activity.value && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Value:</span> {activity.value}
                      </div>
                    )}
                    {activity.cart_value && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Cart Value:</span> {activity.cart_value}
                      </div>
                    )}
                    {activity.items && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Items:</span> {activity.items}
                      </div>
                    )}
                    {activity.payment_method && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Payment:</span> {activity.payment_method}
                      </div>
                    )}
                    {activity.transaction_id && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Transaction:</span> {activity.transaction_id}
                      </div>
                    )}
                    {activity.channel && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Channel:</span> {activity.channel}
                      </div>
                    )}
                    {activity.topic && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Topic:</span> {activity.topic}
                      </div>
                    )}
                    {activity.rating && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Rating:</span> {activity.rating}/5
                      </div>
                    )}
                    {activity.comments && (
                      <div className="flex items-center gap-1 col-span-2">
                        <span className="font-medium">Comments:</span> {activity.comments}
                      </div>
                    )}
                    {activity.changes && (
                      <div className="flex items-center gap-1 col-span-2">
                        <span className="font-medium">Changes:</span> {activity.changes.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="map" className="pt-4">
          <div className="h-[400px] w-full rounded-md bg-muted/20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Activity map would render here</p>
              <p className="text-xs text-muted-foreground mt-1">Showing geographical distribution of user activities</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border p-4">
              <h4 className="text-sm font-medium mb-2">Activity by Type</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Page Views</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Actions</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Logins</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Purchases</span>
                  <span className="text-sm font-medium">8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Other</span>
                  <span className="text-sm font-medium">7%</span>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h4 className="text-sm font-medium mb-2">Activity by Time</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Morning (6AM-12PM)</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Afternoon (12PM-6PM)</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Evening (6PM-12AM)</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Night (12AM-6AM)</span>
                  <span className="text-sm font-medium">2%</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getActivityIcon(type: string) {
  switch (type) {
    case "login":
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
      )
    case "page_view":
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>👁️</AvatarFallback>
        </Avatar>
      )
    case "action":
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>🖱️</AvatarFallback>
        </Avatar>
      )
    case "checkout":
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>🛒</AvatarFallback>
        </Avatar>
      )
    case "purchase":
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>💰</AvatarFallback>
        </Avatar>
      )
    case "support":
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>🎧</AvatarFallback>
        </Avatar>
      )
    case "feedback":
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>📝</AvatarFallback>
        </Avatar>
      )
    default:
      return (
        <Avatar className="h-6 w-6">
          <AvatarFallback>📊</AvatarFallback>
        </Avatar>
      )
  }
}


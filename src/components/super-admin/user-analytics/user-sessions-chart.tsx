"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export function UserSessionsChart() {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily")
  const [segmentBy, setSegmentBy] = useState<"device" | "browser" | "location" | "referrer">("device")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium">Session Distribution</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={view === "daily" ? "default" : "outline"} size="sm" onClick={() => setView("daily")}>
            Daily
          </Button>
          <Button variant={view === "weekly" ? "default" : "outline"} size="sm" onClick={() => setView("weekly")}>
            Weekly
          </Button>
          <Button variant={view === "monthly" ? "default" : "outline"} size="sm" onClick={() => setView("monthly")}>
            Monthly
          </Button>

          <Select value={segmentBy} onValueChange={(value: any) => setSegmentBy(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Segment by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="device">Device</SelectItem>
              <SelectItem value="browser">Browser</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="referrer">Referrer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[350px] w-full rounded-md bg-muted/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Session distribution chart would render here</p>
          <p className="text-xs text-muted-foreground mt-1">
            Showing {view} view, segmented by {segmentBy}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="insights">
          <TabsList className="grid w-full max-w-[400px] grid-cols-3">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2PM - 5PM</div>
                  <p className="text-xs text-muted-foreground">Most active time period</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Most Active Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Wednesday</div>
                  <p className="text-xs text-muted-foreground">32% of weekly sessions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Mobile: 68%</div>
                  <p className="text-xs text-muted-foreground">Desktop: 32%</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Session Breakdown</CardTitle>
                <CardDescription>Distribution by {segmentBy}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segmentBy === "device" && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <span className="text-sm">Mobile</span>
                          </div>
                          <span className="text-sm font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Desktop</span>
                          </div>
                          <span className="text-sm font-medium">24%</span>
                        </div>
                        <Progress value={24} className="h-2 bg-muted [&>div]:bg-blue-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Tablet</span>
                          </div>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <Progress value={8} className="h-2 bg-muted [&>div]:bg-green-500" />
                      </div>
                    </>
                  )}

                  {segmentBy === "browser" && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <span className="text-sm">Chrome</span>
                          </div>
                          <span className="text-sm font-medium">52%</span>
                        </div>
                        <Progress value={52} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Safari</span>
                          </div>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <Progress value={28} className="h-2 bg-muted [&>div]:bg-blue-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                            <span className="text-sm">Firefox</span>
                          </div>
                          <span className="text-sm font-medium">12%</span>
                        </div>
                        <Progress value={12} className="h-2 bg-muted [&>div]:bg-orange-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Edge</span>
                          </div>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <Progress value={8} className="h-2 bg-muted [&>div]:bg-green-500" />
                      </div>
                    </>
                  )}

                  {segmentBy === "location" && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <span className="text-sm">United States</span>
                          </div>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">United Kingdom</span>
                          </div>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <Progress value={18} className="h-2 bg-muted [&>div]:bg-blue-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Canada</span>
                          </div>
                          <span className="text-sm font-medium">12%</span>
                        </div>
                        <Progress value={12} className="h-2 bg-muted [&>div]:bg-green-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Australia</span>
                          </div>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <Progress value={8} className="h-2 bg-muted [&>div]:bg-yellow-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            <span className="text-sm">Other</span>
                          </div>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <Progress value={20} className="h-2 bg-muted [&>div]:bg-purple-500" />
                      </div>
                    </>
                  )}

                  {segmentBy === "referrer" && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <span className="text-sm">Direct</span>
                          </div>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Google</span>
                          </div>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <Progress value={28} className="h-2 bg-muted [&>div]:bg-blue-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Social Media</span>
                          </div>
                          <span className="text-sm font-medium">22%</span>
                        </div>
                        <Progress value={22} className="h-2 bg-muted [&>div]:bg-green-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Email</span>
                          </div>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <Progress value={10} className="h-2 bg-muted [&>div]:bg-yellow-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            <span className="text-sm">Other</span>
                          </div>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <Progress value={5} className="h-2 bg-muted [&>div]:bg-purple-500" />
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Session Trends</CardTitle>
                <CardDescription>Changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Session Duration</span>
                    <div className="flex items-center gap-1 text-emerald-500 text-sm">
                      <span>+12.3%</span>
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
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pages Per Session</span>
                    <div className="flex items-center gap-1 text-emerald-500 text-sm">
                      <span>+3.7%</span>
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
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bounce Rate</span>
                    <div className="flex items-center gap-1 text-emerald-500 text-sm">
                      <span>-2.1%</span>
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
                        className="lucide lucide-trending-down"
                      >
                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                        <polyline points="16 17 22 17 22 11" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">New vs Returning</span>
                    <div className="flex items-center gap-1 text-rose-500 text-sm">
                      <span>-5.3%</span>
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
                        className="lucide lucide-trending-down"
                      >
                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                        <polyline points="16 17 22 17 22 11" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile Usage</span>
                    <div className="flex items-center gap-1 text-emerald-500 text-sm">
                      <span>+8.2%</span>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


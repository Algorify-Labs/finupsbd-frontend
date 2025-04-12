"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart4, Download, Filter, PlusCircle, Save, Share2, Users } from "lucide-react"

export function UserSegmentation() {
  const [segmentType, setSegmentType] = useState<"behavior" | "demographics" | "custom">("behavior")
  const [savedSegment, setSavedSegment] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Segmentation
            </CardTitle>
            <CardDescription>Analyze user behavior by segments and cohorts</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Select value={savedSegment || ""} onValueChange={setSavedSegment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Saved segments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high_value">High Value Users</SelectItem>
                <SelectItem value="new_users">New Users (30d)</SelectItem>
                <SelectItem value="churned">Churned Users</SelectItem>
                <SelectItem value="power_users">Power Users</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Save className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="segments" className="w-full">
          <div className="border-b px-6">
            <TabsList className="w-full justify-start rounded-none border-b-0 pl-0">
              <TabsTrigger
                value="segments"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Segments
              </TabsTrigger>
              <TabsTrigger
                value="cohorts"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Cohorts
              </TabsTrigger>
              <TabsTrigger
                value="funnels"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Funnels
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="segments" className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={segmentType === "behavior" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSegmentType("behavior")}
                  >
                    Behavior
                  </Button>
                  <Button
                    variant={segmentType === "demographics" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSegmentType("demographics")}
                  >
                    Demographics
                  </Button>
                  <Button
                    variant={segmentType === "custom" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSegmentType("custom")}
                  >
                    Custom
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    Add Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {segmentType === "behavior" && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <SegmentCard
                        title="Active Users"
                        count={1245}
                        percentage={28}
                        change="+5.2%"
                        description="Users who logged in within the last 30 days"
                      />
                      <SegmentCard
                        title="Power Users"
                        count={387}
                        percentage={8.7}
                        change="+2.1%"
                        description="Users with 10+ sessions in the last 30 days"
                      />
                      <SegmentCard
                        title="Churned Users"
                        count={532}
                        percentage={12}
                        change="-3.5%"
                        description="Users who haven't logged in for 60+ days"
                        negative
                      />
                      <SegmentCard
                        title="New Users"
                        count={876}
                        percentage={19.7}
                        change="+8.3%"
                        description="Users who signed up in the last 30 days"
                      />
                      <SegmentCard
                        title="High Value Users"
                        count={215}
                        percentage={4.8}
                        change="+1.2%"
                        description="Users who spent $100+ in the last 90 days"
                      />
                      <SegmentCard
                        title="At-Risk Users"
                        count={342}
                        percentage={7.7}
                        change="+2.8%"
                        description="Active users with declining engagement"
                        negative
                      />
                    </div>

                    <Button variant="outline" className="w-full gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Create Custom Segment
                    </Button>
                  </>
                )}

                {segmentType === "demographics" && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Age Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">18-24</span>
                              <span className="text-sm font-medium">22%</span>
                            </div>
                            <Progress value={22} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">25-34</span>
                              <span className="text-sm font-medium">38%</span>
                            </div>
                            <Progress value={38} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">35-44</span>
                              <span className="text-sm font-medium">25%</span>
                            </div>
                            <Progress value={25} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">45-54</span>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                            <Progress value={10} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">55+</span>
                              <span className="text-sm font-medium">5%</span>
                            </div>
                            <Progress value={5} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Gender Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Male</span>
                              <span className="text-sm font-medium">52%</span>
                            </div>
                            <Progress value={52} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Female</span>
                              <span className="text-sm font-medium">45%</span>
                            </div>
                            <Progress value={45} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Other</span>
                              <span className="text-sm font-medium">3%</span>
                            </div>
                            <Progress value={3} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Location</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">United States</span>
                              <span className="text-sm font-medium">42%</span>
                            </div>
                            <Progress value={42} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">United Kingdom</span>
                              <span className="text-sm font-medium">18%</span>
                            </div>
                            <Progress value={18} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Canada</span>
                              <span className="text-sm font-medium">12%</span>
                            </div>
                            <Progress value={12} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Australia</span>
                              <span className="text-sm font-medium">8%</span>
                            </div>
                            <Progress value={8} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Other</span>
                              <span className="text-sm font-medium">20%</span>
                            </div>
                            <Progress value={20} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Device Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Mobile</span>
                              <span className="text-sm font-medium">68%</span>
                            </div>
                            <Progress value={68} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Desktop</span>
                              <span className="text-sm font-medium">24%</span>
                            </div>
                            <Progress value={24} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Tablet</span>
                              <span className="text-sm font-medium">8%</span>
                            </div>
                            <Progress value={8} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {segmentType === "custom" && (
                  <div className="rounded-md border p-6 flex flex-col items-center justify-center">
                    <div className="text-center space-y-2">
                      <BarChart4 className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Create Custom Segment</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Define your own user segments based on specific criteria and behaviors to gain deeper insights.
                      </p>
                      <Button className="mt-2">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Segment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cohorts" className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-medium">Cohort Analysis</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="retention">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retention">Retention</SelectItem>
                      <SelectItem value="conversion">Conversion</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="h-[400px] w-full rounded-md bg-muted/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Cohort analysis chart would render here</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Showing retention rates for user cohorts over time
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="funnels" className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-medium">Conversion Funnels</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="signup_purchase">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Funnel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="signup_purchase">Signup to Purchase</SelectItem>
                      <SelectItem value="product_checkout">Product to Checkout</SelectItem>
                      <SelectItem value="trial_conversion">Trial to Paid</SelectItem>
                      <SelectItem value="custom">Custom Funnel</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="h-[400px] w-full rounded-md bg-muted/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Funnel visualization would render here</p>
                  <p className="text-xs text-muted-foreground mt-1">Showing conversion rates between funnel steps</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface SegmentCardProps {
  title: string
  count: number
  percentage: number
  change: string
  description: string
  negative?: boolean
}

function SegmentCard({ title, count, percentage, change, description, negative = false }: SegmentCardProps) {
  const isPositiveChange = !change.includes("-")
  const changeColor = negative
    ? isPositiveChange
      ? "text-rose-500"
      : "text-emerald-500"
    : isPositiveChange
      ? "text-emerald-500"
      : "text-rose-500"

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{count.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{percentage}% of total users</p>
          </div>
          <div className={`text-sm ${changeColor}`}>{change}</div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState } from "react"
import {
  User,
  Shield,
  Clock,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Edit,
  Key,
  LogOut,
  Bell,
  Copy,
  CheckCheck,
  Eye,
  EyeOff,
  AlertCircle,
  UserCircle,
  Activity,
  Lock,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { UserData } from "@/components/user/types"
import { formatDate } from "@/lib/utils"


interface UserProfileDashboardProps {
  user: UserData
}

export default function DetailsViewUserProfile({ user }: UserProfileDashboardProps) {
  console.log(user)
  const [showPin, setShowPin] = useState(false)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
  }

  const calculateAccountAge = () => {
    const createdDate = new Date(user.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - createdDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const calculatePinExpiry = () => {
    const expiryDate = new Date(user.pinExpiry)
    const now = new Date()
    if (expiryDate < now) return "Expired"

    const diffTime = Math.abs(expiryDate.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} days`
  }

  const calculateSecurityScore = () => {
    let score = 0
    if (user.emailVerified) score += 25
    if (user.pin) score += 25
    if (user.password) score += 25
    if (user.lastLogin) score += 25
    return score
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={user.profile?.avatar} alt="profile image" />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {/* {getInitials(user.name)} */} image
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <Badge className="md:ml-2 self-center" variant={user.isActive ? "default" : "destructive"}>
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="h-4 w-4 mr-1" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-4 w-4 mr-1" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Shield className="h-4 w-4 mr-1" />
                <span>{user.role}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <Button size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <Key className="h-4 w-4" />
                Change Password
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">User ID</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="font-mono font-medium">{user.userId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(user.userId, "User ID")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-muted-foreground">Account Age</div>
              <div className="font-medium mt-1">{calculateAccountAge()} days</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <UserCircle className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <User className="mr-2 h-4 w-4 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Name</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Address:
                  </span>
                  <span>{user.profile?.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <Badge variant="outline" className="font-normal">
                    {user.role}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-primary" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Account Status</span>
                  <Badge variant={user.isActive ? "default" : "destructive"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email Verified</span>
                  {user.emailVerified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created On</span>
                  <span>{formatDate(user.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Login</span>
                  <span>{formatDate(user.lastLogin)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Lock className="mr-2 h-4 w-4 text-primary" />
                  Security Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Security Score</span>
                    <span className="text-sm font-medium">{calculateSecurityScore()}%</span>
                  </div>
                  <Progress value={calculateSecurityScore()} className="h-2" />
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    {user.emailVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span>Email verification</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Password set</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>PIN set</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Recent login</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Timeline</CardTitle>
              <CardDescription>Recent activity on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l border-muted space-y-6">
                <div className="relative">
                  <div className="absolute -left-[25px] p-1 bg-primary rounded-full">
                    <div className="h-3 w-3 rounded-full bg-primary-foreground"></div>
                  </div>
                  <div className="mb-1 text-sm font-medium">Last Login</div>
                  <div className="text-sm text-muted-foreground">{formatDate(user.lastLogin)}</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] p-1 bg-primary rounded-full">
                    <div className="h-3 w-3 rounded-full bg-primary-foreground"></div>
                  </div>
                  <div className="mb-1 text-sm font-medium">Account Updated</div>
                  <div className="text-sm text-muted-foreground">{formatDate(user.updatedAt)}</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] p-1 bg-primary rounded-full">
                    <div className="h-3 w-3 rounded-full bg-primary-foreground"></div>
                  </div>
                  <div className="mb-1 text-sm font-medium">Account Created</div>
                  <div className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Details</CardTitle>
                <CardDescription>Your account security information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Password</span>
                    <Badge variant="outline" className="font-normal">
                      Set
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <div className="flex-1">
                      <div className="text-sm">••••••••••••</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last changed: {formatDate(user.updatedAt)}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">PIN</span>
                    <Badge variant="outline" className="font-normal">
                      {new Date(user.pinExpiry) > new Date() ? "Active" : "Expired"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <div className="flex-1">
                      <div className="text-sm font-mono">{showPin ? user.pin : "••••••"}</div>
                      <div className="text-xs text-muted-foreground mt-1">Expires in: {calculatePinExpiry()}</div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setShowPin(!showPin)}>
                      {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Email Verification</span>
                    <Badge variant={user.emailVerified ? "default" : "destructive"}>
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                  {!user.emailVerified && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <div className="text-sm">
                        Your email is not verified. Please verify your email to secure your account.
                      </div>
                      <Button size="sm" variant="outline" className="flex-shrink-0 bg-white">
                        Verify
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations</CardTitle>
                <CardDescription>Steps to improve your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user.emailVerified && (
                  <div className="flex gap-3 p-3 border border-red-200 bg-red-50 rounded-md">
                    <div className="mt-0.5">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800">Verify your email address</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Email verification helps secure your account and enables account recovery.
                      </p>
                      <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                        Verify Email
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-md">
                  <div className="mt-0.5">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800">Enable two-factor authentication</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Add an extra layer of security to your account with 2FA.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 bg-white border-yellow-300 text-yellow-800 hover:bg-yellow-100"
                    >
                      Enable 2FA
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3 p-3 border border-green-200 bg-green-50 rounded-md">
                  <div className="mt-0.5">
                    <CheckCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">Password strength: Good</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your password appears to be strong. Remember to change it periodically.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Security Settings
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Recent login activity on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-muted-foreground">{formatDate(user.lastLogin)}</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Previous Login</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(new Date(new Date(user.lastLogin).getTime() - 86400000).toISOString())}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    Ended
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>Recent actions and changes to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded-full h-fit">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 pb-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="font-medium">Account Login</div>
                      <div className="text-sm text-muted-foreground">{formatDate(user.lastLogin)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">You logged into your account successfully</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded-full h-fit">
                    <Edit className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 pb-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="font-medium">Account Updated</div>
                      <div className="text-sm text-muted-foreground">{formatDate(user.updatedAt)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Your account information was updated</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded-full h-fit">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 pb-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="font-medium">PIN Generated</div>
                      <div className="text-sm text-muted-foreground">{formatDate(user.updatedAt)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">A new PIN was generated for your account</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded-full h-fit">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="font-medium">Account Created</div>
                      <div className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Your account was created successfully</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Security Alerts</div>
                    <div className="text-sm text-muted-foreground">Get notified about security-related events</div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Email
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      SMS
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Account Updates</div>
                    <div className="text-sm text-muted-foreground">Notifications about changes to your account</div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Email
                    </Badge>
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      SMS
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <div className="font-medium">Marketing & Promotions</div>
                    <div className="text-sm text-muted-foreground">Receive updates about new features and offers</div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      Email
                    </Badge>
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      SMS
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium">System Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Important system updates and maintenance notices
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Email
                    </Badge>
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      SMS
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


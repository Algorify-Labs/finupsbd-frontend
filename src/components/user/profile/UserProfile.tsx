"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Pencil,
  Copy,
  Check,
  Calendar,
  Mail,
  Phone,
  User,
  MapPin,
  Building,
  CreditCard,
  Shield,
  Info,
  Eye,
  EyeOff,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { userInfo } from "@/services/UserData"
import { toast } from "sonner"
import { formatDate } from "@/lib/utils"
import { useUser } from "@/context/UserContext"

interface ProfileField {
  label: string
  value: string | null
  icon: React.ElementType
  sensitive?: boolean
  verified?: boolean
  copyable?: boolean
}

export default function UserProfile() {

  const [error, setError] = useState<string | null>(null)
  const [hideSensitiveInfo, setHideSensitiveInfo] = useState(true)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const { data } = await userInfo()
        setUser(data)
      } catch (err) {
        setError("Failed to load user profile")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])



  
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    // toast({
    //   title: "Copied to clipboard",
    //   description: `${fieldName} has been copied to your clipboard.`,
    //   duration: 2000,
    // })
    toast.success("Copied to clipboard")

    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  const toggleSensitiveInfo = () => {
    setHideSensitiveInfo(!hideSensitiveInfo)
  }

  if (loading) {
    return <ProfileSkeleton />
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
          <Info className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Error Loading Profile</h3>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  const profileFields: ProfileField[] = [
    { label: "Full Name", value: user?.name, icon: User, copyable: true },
    {
      label: "Registered Mobile Number",
      value: user?.phone,
      icon: Phone,
      sensitive: true,
      verified: true,
      copyable: true,
    },
    { label: "Email Address", value: user?.email, icon: Mail, verified: true, copyable: true },
    { label: "Gender", value: user?.profile?.gender, icon: User, sensitive: true },
    { label: "Date of Birth", value: formatDate(user?.profile?.dateOfBirth, "Full date"), icon: Calendar, sensitive: true },
    { label: "National ID Number (NID)", value: user?.phone, icon: CreditCard, sensitive: true, verified: true },
    { label: "Address", value: user?.profile?.address, icon: MapPin, sensitive: true },
    { label: "City", value: user?.profile?.city, icon: Building, sensitive: true },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto border-muted/40 shadow-md">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-32 rounded-t-lg -z-10" />

      <CardHeader className="pb-4 relative">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-sm">
              <AvatarImage src={user?.profile?.avatar || ""} alt="Profile picture" />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl">{user?.name}</h2>
                <Badge variant="outline" className="text-xs font-normal border-primary/20 text-primary">
                  {user?.role}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/user/update-profile">
              <Button variant="outline" size="sm" className="gap-1">
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={toggleSensitiveInfo}>
              {hideSensitiveInfo ? (
                <>
                  <Eye className="h-3 w-3" />
                  Show Personal Info
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3" />
                  Hide Personal Info
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <div className="space-y-5">
          {profileFields.map((field) => (
            <div key={field.label} className="flex justify-between items-center group">
              <div className="flex items-center gap-2">
                <field.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{field.label}:</span>
                {field.verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Shield className="h-3 w-3 text-green-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Verified</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {field.sensitive && hideSensitiveInfo ? "••••••••••••" : field.value || "Not provided"}
                </span>

                {field.copyable && field.value && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(field.value as string, field.label)}
                        >
                          {copiedField === field.label ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3 text-muted-foreground" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{copiedField === field.label ? "Copied!" : "Copy to clipboard"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
          Request Data Update
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProfileSkeleton() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="space-y-5">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}


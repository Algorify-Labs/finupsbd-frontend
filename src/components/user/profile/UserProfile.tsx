"use client";

import type React from "react";

import {
  Building,
  Calendar,
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Info,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/utils";
import { userInfo } from "@/services/UserData";
import Link from "next/link";
import { toast } from "sonner";

interface ProfileField {
  label: string;
  value: string | null;
  icon: React.ElementType;
  sensitive?: boolean;
  verified?: boolean;
  copyable?: boolean;
}

export default function UserProfile() {
  const [error, setError] = useState<string | null>(null);
  const [hideSensitiveInfo, setHideSensitiveInfo] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await userInfo();
        setUser(data);
      } catch (err) {
        setError("Failed to load user profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    // toast({
    //   title: "Copied to clipboard",
    //   description: `${fieldName} has been copied to your clipboard.`,
    //   duration: 2000,
    // })
    toast.success("Copied to clipboard");

    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const toggleSensitiveInfo = () => {
    setHideSensitiveInfo(!hideSensitiveInfo);
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-10 pt-6">
          <Info className="mb-4 h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">Error Loading Profile</h3>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
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
    {
      label: "Email Address",
      value: user?.email,
      icon: Mail,
      verified: true,
      copyable: true,
    },
    {
      label: "Gender",
      value: user?.profile?.gender,
      icon: User,
      sensitive: true,
    },
    {
      label: "Date of Birth",
      value: formatDate(user?.profile?.dateOfBirth, "Full date"),
      icon: Calendar,
      sensitive: true,
      copyable: true,
    },
    {
      label: "National ID Number (NID)",
      value: user?.phone,
      icon: CreditCard,
      sensitive: true,
      verified: true,
      copyable: true,
    },
    {
      label: "Address",
      value: user?.profile?.address,
      icon: MapPin,
      sensitive: true,
      copyable: true,
    },
    {
      label: "City",
      value: user?.profile?.city,
      icon: Building,
      sensitive: true,
    },
  ];

  return (
    <Card className="relative mx-auto w-full max-w-2xl border-muted/40 shadow-md">
      <CardHeader className="relative rounded-t-xl pb-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-sm">
              <AvatarImage
                src={user?.profile?.avatar || ""}
                alt="Profile picture"
              />
              <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
                {user?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex gap-2">
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <Badge
                  variant="outline"
                  className="border-primary/20 text-xs font-normal text-primary"
                >
                  {user?.role}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Member since{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <Link href="/user/update-profile">
              <Button variant="outline" size="sm" className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 px-0 text-sm hover:bg-white hover:text-primary"
              onClick={toggleSensitiveInfo}
            >
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
            <div
              key={field.label}
              className="group flex items-center justify-between pb-2"
            >
              <div className="flex items-center gap-2">
                <field.icon className="h-4 w-4 text-green-950" />
                <span className="text-sm">{field.label}:</span>
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
                  {field.sensitive && hideSensitiveInfo
                    ? "••••••••••••"
                    : field.value || "Not provided"}
                </span>

                {field.copyable && field.value && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 !text-primary"
                          onClick={() =>
                            copyToClipboard(field.value as string, field.label)
                          }
                        >
                          {copiedField === field.label ? (
                            <Check className="h-3 w-3 text-green-950" />
                          ) : (
                            <Copy className="h-3 w-3 text-green-950" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          {copiedField === field.label
                            ? "Copied!"
                            : "Copy to clipboard"}
                        </p>
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
        <span className="text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </span>
        <Button variant="link" size="lg" className="h-auto p-0 text-sm">
          Request Data Update
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div>
              <Skeleton className="mb-2 h-6 w-40" />
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
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

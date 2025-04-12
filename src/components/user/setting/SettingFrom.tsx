// app/settings/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account Settings</CardTitle>
          <CardDescription>Manage your account preferences and security settings</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Change Password Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <Link href="/settings/change-password">
                <Button variant="outline">Reset</Button>
              </Link>
            </div>
            <Separator />
          </div>

          {/* Update Contact Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Update Email / Mobile Number</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your contact information
                </p>
              </div>
              <Link href="/settings/update-contact">
                <Button variant="outline">Edit</Button>
              </Link>
            </div>
            <Separator />
          </div>

          {/* Delete Account Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-destructive">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently remove your account
                </p>
              </div>
              <Link href="/settings/delete-account">
                <Button variant="destructive">Delete Account</Button>
              </Link>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <form action="/api/auth/logout" method="POST">
            <Button variant="outline" className="text-destructive" type="submit">
              Logout
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
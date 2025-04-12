"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function SuccessDialog() {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-green-50 p-3">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Congratulations!</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-lg font-medium">Your Application is Submitted Successfully</p>
            <p className="text-zinc-500">Tracking Number: #{12345678}</p>
            <p className="text-sm text-muted-foreground">
              We&apos;re reviewing your application. Use the tracking number to monitor your status.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="outline" className="w-full" onClick={() => console.log("Explore more")}>
              Explore More Products
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => console.log("Track application")}>
              Track My Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


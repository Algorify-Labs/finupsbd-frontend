"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ApplicationStatus from "./ApplicationStatus"

export default function DemoStatus() {
  const [status, setStatus] = useState<"PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED">("IN_PROGRESS")

  const messages = {
    PENDING: "Your application has been received and is pending review",
    IN_PROGRESS: "Your loan application is currently under review",
    APPROVED: "Congratulations! Your loan application has been approved",
    REJECTED: "We're sorry, your loan application has been rejected",
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Demo Controls</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={status} onValueChange={(value: any) => setStatus(value)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStatus("PENDING")} className="flex-1">
              Pending
            </Button>
            <Button variant="outline" onClick={() => setStatus("IN_PROGRESS")} className="flex-1">
              In Progress
            </Button>
            <Button variant="outline" onClick={() => setStatus("APPROVED")} className="flex-1">
              Approved
            </Button>
            <Button variant="outline" onClick={() => setStatus("REJECTED")} className="flex-1">
              Rejected
            </Button>
          </div>
        </div>
      </div>

      <ApplicationStatus status={status} message={messages[status]} />
    </div>
  )
}


"use client"

import { Check, Circle, Clock, X } from "lucide-react"
import { cva } from "class-variance-authority"
import DemoStatus from "./DemoStatus"

type ApplicationStatus = "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED"

interface ApplicationTrackerProps {
  status: ApplicationStatus
  message?: string
}

const stepStyles = cva(
  "w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300",
  {
    variants: {
      state: {
        completed: "bg-green-500",
        current: "bg-blue-500",
        upcoming: "bg-gray-200 text-gray-500",
        rejected: "bg-red-500",
      },
    },
    defaultVariants: {
      state: "upcoming",
    },
  },
)

export default function ApplicationStatus({
  status = "IN_PROGRESS",
  message = "Your Loan Application is under review",
}: ApplicationTrackerProps) {
  // Determine the progress percentage based on status
  const progressPercentage = status === "PENDING" ? 0 : status === "IN_PROGRESS" ? 50 : 100

  return (
    
    <div className="bg-slate-50 min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Application Status</h1>
     

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                status === "PENDING"
                  ? "bg-gray-100 text-gray-700"
                  : status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-700"
                    : status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
              }`}
            >
              {status === "PENDING"
                ? "Pending"
                : status === "IN_PROGRESS"
                  ? "In Progress"
                  : status === "APPROVED"
                    ? "Approved"
                    : "Rejected"}
            </div>
          </div>

          <p className="text-center font-medium text-lg mb-10">{message}</p>

          <div className="relative flex justify-between items-center max-w-2xl mx-auto mb-16">
            {/* Background Progress Line */}
            <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -translate-y-1/2 z-0 rounded-full"></div>

            {/* Active Progress Line */}
            <div
              className={`absolute left-0 top-1/2 h-1 rounded-full -translate-y-1/2 z-0 transition-all duration-500 ease-in-out ${
                status === "REJECTED" ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>

            {/* Step 1: Submitted */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={stepStyles({ state: "completed" })}>
                <Check className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm font-medium">Submitted</span>
            </div>

            {/* Step 2: In Process */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={stepStyles({
                  state: status === "PENDING" ? "upcoming" : status === "IN_PROGRESS" ? "current" : "completed",
                })}
              >
                {status === "PENDING" ? (
                  <Circle className="w-5 h-5" />
                ) : status === "IN_PROGRESS" ? (
                  <Clock className="w-5 h-5" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">In Process</span>
            </div>

            {/* Step 3: Approved/Rejected */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={stepStyles({
                  state: status === "APPROVED" ? "completed" : status === "REJECTED" ? "rejected" : "upcoming",
                })}
              >
                {status === "APPROVED" ? (
                  <Check className="w-5 h-5" />
                ) : status === "REJECTED" ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">{status === "REJECTED" ? "Rejected" : "Approved"}</span>
            </div>
          </div>

          {status === "REJECTED" && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 text-sm">
              <p className="font-medium">Application Rejected</p>
              <p className="mt-1">
                We're sorry, but your application has been rejected. Please contact our support team for more
                information.
              </p>
            </div>
          )}

          {status === "APPROVED" && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700 text-sm">
              <p className="font-medium">Application Approved</p>
              <p className="mt-1">
                Congratulations! Your application has been approved. Our team will contact you shortly with next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


// import React from 'react'
// import { ApplicationStatusData } from './TrackingApplicationTypes'

// const TrackApplicationStatus = ({applicationStatusData}: {applicationStatusData: ApplicationStatusData}) => {
//     const { status, adminNotes, applicationId, loanRequest, user } = applicationStatusData
//     console.log(status)
//   return (
//     <div>
//       ApplicationStatus
//     </div>
//   )
// }

// export default TrackApplicationStatus

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, FileText } from "lucide-react";
import Image from "next/image";
// import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link";
import { ApplicationStatusData } from "./TrackingApplicationTypes";

export default function TrackApplicationStatus({
  applicationStatusData,
}: {
  applicationStatusData: ApplicationStatusData;
}) {
  // This would normally come from an API call
  //   const applicationStatusData = {
  //     status: "SUBMITTED",
  //     adminNotes: null,
  //     applicationId: "325041400002",
  //     loanRequest: {
  //       id: "b22d1124-a4a8-41e9-bae6-512dd0aa04b5",
  //       loanType: "Personal Loan",
  //       loanAmount: "500000",
  //       purpose: "Medical Expenses",
  //       tenure: "24",
  //       emiStartDate: "2025-05-01",
  //       repaymentPreferences: "Bank Transfer",
  //       loanApplicationFormId: "d8e6d6d6-f42b-47c0-bafa-e94ed2913f43",
  //     },
  //     user: {
  //       name: "yyyyyy",
  //       userId: "250414001",
  //       profile: {
  //         id: "5665849f-4b6b-4223-b104-ae82b6b6eb53",
  //         nameAsNid: "Shamim reza",
  //         nationalIdNumber: "1234567890",
  //         gender: "MALE",
  //         dateOfBirth: "1995-06-15T00:00:00.000Z",
  //         avatar: "https://res.cloudinary.com/djr5gjijg/image/upload/v1744573945/Blog-1744573943090.jpg",
  //         address: "123 Street Name",
  //         city: "New York",
  //         userId: "f1ec5cd2-7784-4f2b-939f-11a850acb7e6",
  //       },
  //     },
  //   }

  const getStatusStep = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return 1;
      case "IN_PROCESS":
        return 2;
      case "PENDING":
        return 3;
      case "APPROVED":
      case "REJECTED":
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep(applicationStatusData.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ArrowRight className="mx-2 h-3 w-3" />
          <span className="font-medium text-gray-700">Track Application</span>
        </nav>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Track Application
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Status Card */}
          <Card className="border-0 shadow-sm md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Application Status</CardTitle>
              <CardDescription>
                Your application ID:{" "}
                <span className="font-medium">
                  {applicationStatusData.applicationId}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="mb-8 text-center text-lg font-semibold">
                  Your Loan Application is{" "}
                  {applicationStatusData.status === "SUBMITTED"
                    ? "under review"
                    : applicationStatusData.status
                        .toLowerCase()
                        .replace("_", " ")}
                </h3>

                {/* Status Tracker */}
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200">
                    <div
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    />
                  </div>

                  {/* Status Steps */}
                  <div className="relative flex justify-between">
                    {/* Step 1: Submitted */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                      >
                        {currentStep > 1 ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        Submitted
                      </span>
                    </div>

                    {/* Step 2: In Process */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                      >
                        {currentStep > 2 ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        In Process
                      </span>
                    </div>
                    {/* Step 2: panding */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 3 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`}
                      >
                        {currentStep > 3 ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <span className="mt-2 text-sm font-medium">Pending</span>
                    </div>

                    {/* Step 3: Approved/Rejected */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 4 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                      >
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        Approved/Rejected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {applicationStatusData.adminNotes !== "NULL" && (
                <Badge variant="destructive" className="mb-4 text-left">
                  NOTE: {applicationStatusData.adminNotes}
                </Badge>
              )}
              {/* Application Details */}
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Loan Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Loan Type</p>
                      <p className="font-medium">
                        {applicationStatusData.loanRequest.loanType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loan Amount</p>
                      <p className="font-medium">
                        {applicationStatusData.loanRequest.loanAmount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Purpose</p>
                      <p className="font-medium">
                        {applicationStatusData.loanRequest.purpose}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tenure</p>
                      <p className="font-medium">
                        {applicationStatusData.loanRequest.tenure} months
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">EMI Start Date</p>
                      <p className="font-medium">
                        {applicationStatusData.loanRequest.emiStartDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Repayment Method</p>
                      <p className="font-medium">
                        {applicationStatusData.loanRequest.repaymentPreferences}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applicant Info Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Applicant Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-3 h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={
                      applicationStatusData?.user?.profile?.avatar ||
                      "/placeholder.svg"
                    }
                    alt="Profile"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  {applicationStatusData?.user?.profile?.nameAsNid}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: {applicationStatusData?.user?.userId}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">National ID</p>
                  <p className="font-medium">
                    {applicationStatusData?.user?.profile?.nationalIdNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">
                    {applicationStatusData?.user?.profile?.gender === "MALE"
                      ? "Male"
                      : "Female"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {applicationStatusData?.user?.profile?.dateOfBirth}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">
                    {applicationStatusData?.user?.profile?.address},{" "}
                    {applicationStatusData?.user?.profile?.city}
                  </p>
                </div>
                <div className="pt-4">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 px-3 py-1 text-green-700"
                  >
                    {applicationStatusData.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

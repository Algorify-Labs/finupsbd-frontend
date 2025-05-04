"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { HelpCircle, Menu } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

// Define a Zod schema for your application form.
const applicationFormSchema = z.object({
  personalLoanId: z.string(),
  userInfo: z.object({
    fullName: z.string().min(1, "Full Name is required"),
    fatherName: z.string().min(1, "Father's Name is required"),
    motherName: z.string().min(1, "Mother's Name is required"),
    spouseName: z.string().optional(),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    placeOfBirth: z.string().min(1, "Place of Birth is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
    nid: z.string().min(1, "NID is required"),
    mobileNumber: z.string().min(1, "Mobile Number is required"),
    emailAddress: z.string().email("Invalid email format"),
    socialMediaLinks: z.array(z.string().url("Invalid URL")).optional().default([""]),
    propertyType: z.enum(["RESIDENTIAL", "COMMERCIAL", "OTHER"]),
    approximateValue: z.number().min(0, "Approximate Value is required"),
  }),
  address: z.object({
    houseFlatNo: z.string().min(1, "House/Flat No is required"),
    streetRoad: z.string().min(1, "Street/Road is required"),
    areaLocality: z.string().min(1, "Area/Locality is required"),
    city: z.string().min(1, "City is required"),
    district: z.string().min(1, "District is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    lengthOfStayYears: z.number().min(0, "Length of Stay is required"),
    ownershipStatus: z.enum(["OWNED", "RENTED", "OTHER"]),
  }),
  employmentFinancialInfo: z.object({
    employmentStatus: z.enum(["SALARIED", "SELF_EMPLOYED", "UNEMPLOYED"]),
    jobTitle: z.string().optional(),
    employerName: z.string().optional(),
    officeAddress: z.string().optional(),
    department: z.string().optional(),
    contactDetails: z.string().optional(),
    businessName: z.string().optional(),
    businessRegistrationNumber: z.string().optional(),
    employmentTenureYears: z.number().min(0).optional(),
    monthlyGrossIncome: z.number().min(0, "Monthly Gross Income is required"),
    totalMonthlyExpenses: z.number().min(0, "Total Monthly Expenses is required"),
    profession: z.string().optional(),
    currentCreditScore: z.number().min(0).optional(),
  }),
  loanSpecifications: z.object({
    loanType: z.enum(["PERSONAL", "HOME", "AUTO"]),
    loanAmountRequested: z.number().min(0, "Loan Amount is required"),
    purposeOfLoan: z.string().min(1, "Purpose is required"),
    preferredLoanTenure: z.number().min(0, "Preferred Loan Tenure is required"),
    proposedEMIStartDate: z.string().min(1, "Proposed EMI Start Date is required"),
    repaymentPreferences: z.string().optional(),
  }),
  financialObligations: z.object({
    description: z.string().optional(),
    amount: z.number().optional(),
  }),
  uploadedDocuments: z.array(
    z.object({
      type: z.string(),
      filePath: z.string(),
      fileSizeMB: z.number(),
      fileType: z.string(),
    }),
  ),
  consentAndDeclaration: z.object({
    consent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the consent and authorization",
    }),
    privacy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the privacy agreement",
    }),
    nda: z.boolean().refine((val) => val === true, {
      message: "You must agree to the non-disclosure agreement",
    }),
    accuracy: z.boolean().refine((val) => val === true, {
      message: "You must confirm the accuracy of provided information",
    }),
    signature: z.string().min(1, "Digital signature is required"),
    date: z.string().min(1, "Date is required"),
  }),
  dataSecurityProtocols: z.object({
    encryption: z.boolean().refine((val) => val === true, {
      message: "You must acknowledge the encryption standards",
    }),
    twoFactor: z.boolean().refine((val) => val === true, {
      message: "You must agree to two-factor authentication",
    }),
    rbac: z.boolean().refine((val) => val === true, {
      message: "You must acknowledge the access control policy",
    }),
    retention: z.boolean().refine((val) => val === true, {
      message: "You must agree to the data retention policy",
    }),
    withdraw: z.boolean().refine((val) => val === true, {
      message: "You must acknowledge the right to withdraw information",
    }),
  })

})

// Infer the form values type from the schema.
type ApplicationFormValues = z.infer<typeof applicationFormSchema>

const AUTOSAVE_INTERVAL = 1000 // 30 seconds

const ApplicationFormVercel = () => {
  const [step, setStep] = useState(0)
  const [isPreview, setIsPreview] = useState(false)
  const [previews, setPreviews] = useState<{ [docType: string]: string }>({})
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    watch,
    getValues,
  } = useForm<ApplicationFormValues>()

  // Calculate form progress
  useEffect(() => {
    const values = getValues()
    const totalFields = Object.keys(applicationFormSchema.shape).length
    const filledFields = Object.keys(values).filter((key) => {
      const value = values[key as keyof ApplicationFormValues]
      return value !== undefined && value !== "" && value !== null
    }).length
    setProgress((filledFields / totalFields) * 100)
  }, [getValues])

  // Autosave functionality
  useEffect(() => {
    if (!isDirty) return

    const autosaveTimer = setInterval(() => {
      const formData = getValues()
      localStorage.setItem("loanApplicationDraft", JSON.stringify(formData))
    }, AUTOSAVE_INTERVAL)

    return () => clearInterval(autosaveTimer)
  }, [isDirty, getValues])

  // Load saved draft
  // useEffect(() => {
  //   const savedDraft = localStorage.getItem("loanApplicationDraft")
  //   if (savedDraft) {
  //     const parsedDraft = JSON.parse(savedDraft)
  //     Object.entries(parsedDraft).forEach(([key, value]) => {
  //       setValue(key as keyof ApplicationFormValues, value)
  //     })
  //   }
  // }, [setValue])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        // File size validation (5MB limit)
        if (file.size > 5 * 1024 * 1024) return

        const documentUrl = URL.createObjectURL(file)
        setPreviews((prev) => ({ ...prev, [docType]: documentUrl }))

        const fileSizeMB = file.size / (1024 * 1024)
        setValue("uploadedDocuments", [
          ...watch("uploadedDocuments"),
          {
            type: docType,
            filePath: documentUrl,
            fileSizeMB,
            fileType: file.type || "unknown",
          },
        ])
      } catch (error) {
        console.error("File upload error:", error)
      }
    }
  }

  const onSubmit: SubmitHandler<ApplicationFormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsPreview(true)
      localStorage.removeItem("loanApplicationDraft")
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    try {
      const data = getValues()
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Final Submission Data:", data)
      setIsPreview(false)
      localStorage.removeItem("loanApplicationDraft")
    } catch (error) {
      console.error("Final submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const renderStepContent = () => {


    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  {...register("userInfo.fullName")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter your full name"
                />
                {errors.userInfo?.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.fullName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Father’s Name</label>
                <Input
                  {...register("userInfo.fatherName")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter father's name"
                />
                {errors.userInfo?.fatherName && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.fatherName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mother’s Name</label>
                <Input
                  {...register("userInfo.motherName")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter mother's name"
                />
                {errors.userInfo?.motherName && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.motherName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Spouse’s Name</label>
                <Input
                  {...register("userInfo.spouseName")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter spouse's name (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Input
                  {...register("userInfo.dateOfBirth")}
                  type="date"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                />
                {errors.userInfo?.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.dateOfBirth.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Place of Birth</label>
                <Input
                  {...register("userInfo.placeOfBirth")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter place of birth"
                />
                {errors.userInfo?.placeOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.placeOfBirth.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <Controller
                  control={control}
                  name="userInfo.gender"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1 w-full rounded-lg border border-gray-300 p-3">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.userInfo?.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.gender.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                <Controller
                  control={control}
                  name="userInfo.maritalStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1 w-full rounded-lg border border-gray-300 p-3">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SINGLE">Single</SelectItem>
                        <SelectItem value="MARRIED">Married</SelectItem>
                        <SelectItem value="DIVORCED">Divorced</SelectItem>
                        <SelectItem value="WIDOWED">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.userInfo?.maritalStatus && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.maritalStatus.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">National ID (NID)</label>
                <Input
                  {...register("userInfo.nid")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter your NID"
                />
                {errors.userInfo?.nid && <p className="text-red-500 text-sm mt-1">{errors.userInfo.nid.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <Input
                  {...register("userInfo.mobileNumber")}
                  type="tel"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter your mobile number"
                />
                {errors.userInfo?.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.mobileNumber.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <Input
                  {...register("userInfo.emailAddress")}
                  type="email"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter your email"
                />
                {errors.userInfo?.emailAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.emailAddress.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Social Media Link</label>
                <Input
                  {...register("userInfo.socialMediaLinks.0")}
                  type="url"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter a social media link (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Type</label>
                <Controller
                  control={control}
                  name="userInfo.propertyType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1 w-full rounded-lg border border-gray-300 p-3">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                        <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.userInfo?.propertyType && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.propertyType.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Approximate Property Value</label>
                <Input
                  {...register("userInfo.approximateValue", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter approximate value"
                />
                {errors.userInfo?.approximateValue && (
                  <p className="text-red-500 text-sm mt-1">{errors.userInfo.approximateValue.message}</p>
                )}
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Residential Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">House/Flat No</label>
                <Input
                  {...register("address.houseFlatNo")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter house/flat number"
                />
                {errors.address?.houseFlatNo && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.houseFlatNo.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Street/Road</label>
                <Input
                  {...register("address.streetRoad")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter street/road"
                />
                {errors.address?.streetRoad && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.streetRoad.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Area/Locality</label>
                <Input
                  {...register("address.areaLocality")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter area/locality"
                />
                {errors.address?.areaLocality && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.areaLocality.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <Input
                  {...register("address.city")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter city"
                />
                {errors.address?.city && <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">District</label>
                <Input
                  {...register("address.district")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter district"
                />
                {errors.address?.district && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.district.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <Input
                  {...register("address.postalCode")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter postal code"
                />
                {errors.address?.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.postalCode.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Length of Stay (Years)</label>
                <Input
                  {...register("address.lengthOfStayYears", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter years"
                />
                {errors.address?.lengthOfStayYears && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.lengthOfStayYears.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ownership Status</label>
                <Controller
                  control={control}
                  name="address.ownershipStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1 w-full rounded-lg border border-gray-300 p-3">
                        <SelectValue placeholder="Select ownership status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OWNED">Owned</SelectItem>
                        <SelectItem value="RENTED">Rented</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.address?.ownershipStatus && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.ownershipStatus.message}</p>
                )}
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Employment & Financial Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Status</label>
                <Controller
                  control={control}
                  name="employmentFinancialInfo.employmentStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1 w-full rounded-lg border border-gray-300 p-3">
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SALARIED">Salaried</SelectItem>
                        <SelectItem value="SELF_EMPLOYED">Self-Employed</SelectItem>
                        <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.employmentFinancialInfo?.employmentStatus && (
                  <p className="text-red-500 text-sm mt-1">{errors.employmentFinancialInfo.employmentStatus.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <Input
                  {...register("employmentFinancialInfo.jobTitle")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter job title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employer Name</label>
                <Input
                  {...register("employmentFinancialInfo.employerName")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter employer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Office Address</label>
                <Input
                  {...register("employmentFinancialInfo.officeAddress")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter office address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <Input
                  {...register("employmentFinancialInfo.department")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter department"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Details</label>
                <Input
                  {...register("employmentFinancialInfo.contactDetails")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter contact details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <Input
                  {...register("employmentFinancialInfo.businessName")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter business name (if applicable)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Registration Number</label>
                <Input
                  {...register("employmentFinancialInfo.businessRegistrationNumber")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter registration number (if applicable)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Tenure (Years)</label>
                <Input
                  {...register("employmentFinancialInfo.employmentTenureYears", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Gross Income</label>
                <Input
                  {...register("employmentFinancialInfo.monthlyGrossIncome", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter income"
                />
                {errors.employmentFinancialInfo?.monthlyGrossIncome && (
                  <p className="text-red-500 text-sm mt-1">{errors.employmentFinancialInfo.monthlyGrossIncome.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Monthly Expenses</label>
                <Input
                  {...register("employmentFinancialInfo.totalMonthlyExpenses", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter expenses"
                />
                {errors.employmentFinancialInfo?.totalMonthlyExpenses && (
                  <p className="text-red-500 text-sm mt-1">{errors.employmentFinancialInfo.totalMonthlyExpenses.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profession</label>
                <Input
                  {...register("employmentFinancialInfo.profession")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter profession"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Credit Score</label>
                <Input
                  {...register("employmentFinancialInfo.currentCreditScore", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter credit score"
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Loan Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Type</label>
                <Controller
                  control={control}
                  name="loanSpecifications.loanType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1 w-full rounded-lg border border-gray-300 p-3">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERSONAL">Personal</SelectItem>
                        <SelectItem value="HOME">Home</SelectItem>
                        <SelectItem value="AUTO">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.loanSpecifications?.loanType && (
                  <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.loanType.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Amount Requested</label>
                <Input
                  {...register("loanSpecifications.loanAmountRequested", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter amount"
                />
                {errors.loanSpecifications?.loanAmountRequested && (
                  <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.loanAmountRequested.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Purpose of Loan</label>
                <Input
                  {...register("loanSpecifications.purposeOfLoan")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter purpose"
                />
                {errors.loanSpecifications?.purposeOfLoan && (
                  <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.purposeOfLoan.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Loan Tenure (Months)</label>
                <Input
                  {...register("loanSpecifications.preferredLoanTenure", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter tenure in months"
                />
                {errors.loanSpecifications?.preferredLoanTenure && (
                  <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.preferredLoanTenure.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Proposed EMI Start Date</label>
                <Input
                  {...register("loanSpecifications.proposedEMIStartDate")}
                  type="date"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                />
                {errors.loanSpecifications?.proposedEMIStartDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.proposedEMIStartDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Repayment Preferences</label>
                <Input
                  {...register("loanSpecifications.repaymentPreferences")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter preferences (optional)"
                />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Financial Obligations</h2>
            <p className="text-gray-600">Add details of existing financial obligations (optional).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Obligation Description</label>
                <Input
                  {...register("financialObligations.description")}
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter description (e.g., Car Loan)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <Input
                  {...register("financialObligations.amount", { valueAsNumber: true })}
                  type="number"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Document Uploads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">NATIONAL_ID</label>
                <Input
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  onChange={(e) => handleFileChange(e, "NATIONAL_ID")}
                  className="mt-2 w-full text-sm text-gray-500"
                />
              </div>
              <div>
                {previews["NATIONAL_ID"] && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Preview:</p>
                    <Image
                      src={previews["NATIONAL_ID"] || "/placeholder.svg"}
                      alt="Preview"
                      className="mt-2 w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">PASSPORT_PHOTO</label>
                <Input
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  onChange={(e) => handleFileChange(e, "PASSPORT_PHOTO")}
                  className="mt-2 w-full text-sm text-gray-500"
                />
              </div>
              <div>
                {previews["PASSPORT_PHOTO"] && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Preview:</p>
                    <Image
                      src={previews["PASSPORT_PHOTO"] || "/placeholder.svg"}
                      alt="Preview"
                      className="mt-2 w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-medium">Applicant Consent and Authorization</h2>
              <div className="flex items-start space-x-2">
                <div className="flex flex-col">
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("consentAndDeclaration.consent")} />
                    <label className="text-sm leading-relaxed">
                      I authorize Standard chartered bank to conduct verification checks, contact my employer, validate my
                      identity with government databases, and perform credit evaluations as required.
                    </label>
                  </div>
                  {errors.consentAndDeclaration?.consent && <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration?.consent.message}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Privacy Agreement</h2>
              <div className="flex items-start space-x-2">
                <div className="flex flex-col">
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("consentAndDeclaration.privacy")} />
                    <label className="text-sm leading-relaxed">
                      I acknowledge that Standard chartered bank will use my data solely for processing and compliance,
                      adhering to data privacy regulations in Bangladesh and internationally
                    </label>
                  </div>
                  {errors.consentAndDeclaration?.privacy && <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration?.privacy.message}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Non-Disclosure Agreement</h2>
              <div className="flex items-start space-x-2">
                <div className="flex flex-col">
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("consentAndDeclaration.nda")} />
                    <label className="text-sm leading-relaxed">
                      I understand my data will remain private and undisclosed except as mandated by regulatory authorities
                    </label>
                  </div>
                  {errors.consentAndDeclaration?.nda && <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration?.nda.message}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-medium">Declaration of Accuracy</h2>
              <div className="flex items-start space-x-2">
                <div className="flex flex-col">
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("consentAndDeclaration.accuracy")} />
                    <label className="text-sm leading-relaxed">
                      I confirm that all details provided are true to the best of my knowledge.
                    </label>
                  </div>
                  {errors.consentAndDeclaration?.accuracy && <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration?.accuracy.message}</span>}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Digital Signature (Type full name as e-signature)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Mr. Aslam Rossa"
                  {...register("consentAndDeclaration.signature")}
                />
                {errors.consentAndDeclaration?.signature && <span className="text-sm text-red-500">{errors.consentAndDeclaration?.signature.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Date (DD/MM/YYYY)</label>
                <input type="date" className="w-full px-3 py-2 border rounded-md" {...register("consentAndDeclaration.date")} />
                {errors.consentAndDeclaration?.date && <span className="text-sm text-red-500">{errors.consentAndDeclaration?.date.message}</span>}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground">
                Financial data is encrypted and accessed strictly under privacy policies. Only credit assessment personnel
                may view this information.
              </p>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Data Security Protocols at Standard chartered bank</h1>
              <p className="text-sm text-muted-foreground">Update your photo and personal details here.</p>
            </div>
              <div className="space-y-4">
                <h2 className="font-medium">Encryption Standards</h2>
                <div className="flex items-start space-x-2">
                  <div className="flex flex-col">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("dataSecurityProtocols.encryption")} />
                      <label className="text-sm leading-relaxed">
                        We use industry-standard SSL and TLS encryption to protect all data in transit. Data at rest is
                        secured by AES-256 encryption
                      </label>
                    </div>
                    {errors.dataSecurityProtocols?.encryption && <span className="text-sm text-red-500 mt-1">{errors.dataSecurityProtocols?.encryption.message}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-medium">Two-Factor Authentication (2FA)</h2>
                <div className="flex items-start space-x-2">
                  <div className="flex flex-col">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("dataSecurityProtocols.twoFactor")} />
                      <label className="text-sm leading-relaxed">
                        Upon submission, you'll be prompted for a One-Time Password (OTP) sent to your registered mobile.
                      </label>
                    </div>
                    {errors.dataSecurityProtocols?.twoFactor && <span className="text-sm text-red-500 mt-1">{errors.dataSecurityProtocols?.twoFactor.message}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-medium">Role-Based Access Control (RBAC)</h2>
                <div className="flex items-start space-x-2">
                  <div className="flex flex-col">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("dataSecurityProtocols.rbac")} />
                      <label className="text-sm leading-relaxed">
                        Only certified loan officers, auditors, and designated staff can view your application, based on
                        strict role assignments.
                      </label>
                    </div>
                    {errors.dataSecurityProtocols?.rbac && <span className="text-sm text-red-500 mt-1">{errors.dataSecurityProtocols?.rbac.message}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-medium">Data Retention Policy</h2>
                <div className="flex items-start space-x-2">
                  <div className="flex flex-col">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("dataSecurityProtocols.retention")} />
                      <label className="text-sm leading-relaxed">
                        Personal data is retained as per banking regulations and disposed of securely once no longer needed.
                      </label>
                    </div>
                    {errors.dataSecurityProtocols?.retention && <span className="text-sm text-red-500 mt-1">{errors.dataSecurityProtocols?.retention.message}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-medium">Right to Withdraw & Update Information</h2>
                <div className="flex items-start space-x-2">
                  <div className="flex flex-col">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" {...register("dataSecurityProtocols.withdraw")} />
                      <label className="text-sm leading-relaxed">
                        You may request to correct or withdraw your application before loan approval.
                      </label>
                    </div>
                    {errors.dataSecurityProtocols?.withdraw && <span className="text-sm text-red-500 mt-1">{errors.dataSecurityProtocols?.withdraw.message}</span>}
                  </div>
                </div>
              </div>
          </div>
        )

      default:
        return null
    }
  }


  
  const renderPreview = () => {
    const data = getValues()
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">Preview Your Application</h2>
        <div className="space-y-6">
          {/* Personal Information Preview */}
          <div className="border p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <Button
                onClick={() => {
                  setStep(0)
                  setIsPreview(false)
                }}
                variant="link"
                className="text-blue-600 hover:underline mt-2 sm:mt-0"
              >
                Edit
              </Button>
            </div>
            <div className="mt-2 space-y-1">
              <p><strong>Full Name:</strong> {data.userInfo.fullName}</p>
              <p><strong>Father's Name:</strong> {data.userInfo.fatherName}</p>
              <p><strong>Mother's Name:</strong> {data.userInfo.motherName}</p>
              <p><strong>Spouse's Name:</strong> {data.userInfo.spouseName}</p>
              <p><strong>Date of Birth:</strong> {data.userInfo.dateOfBirth}</p>
              <p><strong>Place of Birth:</strong> {data.userInfo.placeOfBirth}</p>
              <p><strong>Gender:</strong> {data.userInfo.gender}</p>
              <p><strong>Marital Status:</strong> {data.userInfo.maritalStatus}</p>
              <p><strong>NID:</strong> {data.userInfo.nid}</p>
              <p><strong>Mobile Number:</strong> {data.userInfo.mobileNumber}</p>
              <p><strong>Email Address:</strong> {data.userInfo.emailAddress}</p>
              <p><strong>Social Media Link:</strong> {data.userInfo.socialMediaLinks[0]}</p>
              <p><strong>Property Type:</strong> {data.userInfo.propertyType}</p>
              <p><strong>Approximate Property Value:</strong> {data.userInfo.approximateValue}</p>
            </div>
          </div>

          {/* Residential Information Preview */}
          <div className="border p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-xl font-semibold">Residential Information</h3>
              <Button
                onClick={() => {
                  setStep(1)
                  setIsPreview(false)
                }}
                variant="link"
                className="text-blue-600 hover:underline mt-2 sm:mt-0"
              >
                Edit
              </Button>
            </div>
            <div className="mt-2 space-y-1">
              <p><strong>House/Flat No:</strong> {data.address.houseFlatNo}</p>
              <p><strong>Street/Road:</strong> {data.address.streetRoad}</p>
              <p><strong>Area/Locality:</strong> {data.address.areaLocality}</p>
              <p><strong>City:</strong> {data.address.city}</p>
              <p><strong>District:</strong> {data.address.district}</p>
              <p><strong>Postal Code:</strong> {data.address.postalCode}</p>
              <p><strong>Length of Stay:</strong> {data.address.lengthOfStayYears} years</p>
              <p><strong>Ownership Status:</strong> {data.address.ownershipStatus}</p>
            </div>
          </div>

          {/* Employment & Financial Info Preview */}
          <div className="border p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-xl font-semibold">Employment & Financial Info</h3>
              <Button
                onClick={() => {
                  setStep(2)
                  setIsPreview(false)
                }}
                variant="link"
                className="text-blue-600 hover:underline mt-2 sm:mt-0"
              >
                Edit
              </Button>
            </div>
            <div className="mt-2 space-y-1">
              <p><strong>Employment Status:</strong> {data.employmentFinancialInfo.employmentStatus}</p>
              <p><strong>Job Title:</strong> {data.employmentFinancialInfo.jobTitle}</p>
              <p><strong>Employer Name:</strong> {data.employmentFinancialInfo.employerName}</p>
              <p><strong>Office Address:</strong> {data.employmentFinancialInfo.officeAddress}</p>
              <p><strong>Department:</strong> {data.employmentFinancialInfo.department}</p>
              <p><strong>Contact Details:</strong> {data.employmentFinancialInfo.contactDetails}</p>
              <p><strong>Business Name:</strong> {data.employmentFinancialInfo.businessName}</p>
              <p><strong>Business Registration Number:</strong> {data.employmentFinancialInfo.businessRegistrationNumber}</p>
              <p><strong>Employment Tenure:</strong> {data.employmentFinancialInfo.employmentTenureYears} years</p>
              <p><strong>Monthly Gross Income:</strong> {data.employmentFinancialInfo.monthlyGrossIncome}</p>
              <p><strong>Total Monthly Expenses:</strong> {data.employmentFinancialInfo.totalMonthlyExpenses}</p>
              <p><strong>Profession:</strong> {data.employmentFinancialInfo.profession}</p>
              <p><strong>Current Credit Score:</strong> {data.employmentFinancialInfo.currentCreditScore}</p>
            </div>
          </div>

          {/* Loan Specifications Preview */}
          <div className="border p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-xl font-semibold">Loan Specifications</h3>
              <Button
                onClick={() => {
                  setStep(3)
                  setIsPreview(false)
                }}
                variant="link"
                className="text-blue-600 hover:underline mt-2 sm:mt-0"
              >
                Edit
              </Button>
            </div>
            <div className="mt-2 space-y-1">
              <p><strong>Loan Type:</strong> {data.loanSpecifications.loanType}</p>
              <p><strong>Loan Amount Requested:</strong> {data.loanSpecifications.loanAmountRequested}</p>
              <p><strong>Purpose of Loan:</strong> {data.loanSpecifications.purposeOfLoan}</p>
              <p><strong>Preferred Loan Tenure:</strong> {data.loanSpecifications.preferredLoanTenure} months</p>
              <p><strong>Proposed EMI Start Date:</strong> {data.loanSpecifications.proposedEMIStartDate}</p>
              <p><strong>Repayment Preferences:</strong> {data.loanSpecifications.repaymentPreferences}</p>
            </div>
          </div>

          {/* Financial Obligations Preview */}
          <div className="border p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-xl font-semibold">Financial Obligations</h3>
              <Button
                onClick={() => {
                  setStep(4)
                  setIsPreview(false)
                }}
                variant="link"
                className="text-blue-600 hover:underline mt-2 sm:mt-0"
              >
                Edit
              </Button>
            </div>
            <div className="mt-2 space-y-1">
              <p><strong>Description:</strong> {data.financialObligations.description}</p>
              <p><strong>Amount:</strong> {data.financialObligations.amount}</p>
            </div>
          </div>

          {/* Document Uploads Preview */}
          <div className="border p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="text-xl font-semibold">Document Uploads</h3>
              <Button
                onClick={() => {
                  setStep(5)
                  setIsPreview(false)
                }}
                variant="link"
                className="text-blue-600 hover:underline mt-2 sm:mt-0"
              >
                Edit
              </Button>
            </div>
            <div className="mt-2">
              {data.uploadedDocuments.length > 0 ? (
                data.uploadedDocuments.map((doc, index) => (
                  <p key={index}>
                    <strong>{doc.type}:</strong> {doc.fileType} - {doc.fileSizeMB.toFixed(2)} MB
                  </p>
                ))
              ) : (
                <p>No documents uploaded.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Button
            onClick={() => setIsPreview(false)}
            variant="outline"
            className="px-6 py-3"
          >
            Back
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={handleFinalSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
              >
                Final Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Application?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to submit your loan application? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleFinalSubmit}>Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-full md:w-72" : "w-20"} bg-gradient-to-b from-primary to-primary-foreground text-primary-foreground shadow-lg transition-all duration-300`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 text-primary-foreground hover:text-primary-foreground/80 focus:outline-none"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="px-4 py-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm mt-1 text-primary-foreground/80">{Math.round(progress)}% Complete</p>
        </div>
        <ul className={`mt-6 space-y-4 ${isSidebarOpen ? "px-6" : "px-2"} transition-all`}>
          {[
            "Personal Information",
            "Residential Information",
            "Employment Info",
            "Loan Request",
            "Financial Obligations",
            "Document Uploads",
            "Consent and Declaration",
            "Final Data Security Overview",
          ].map((label, idx) => (
            <li
              key={idx}
              onClick={() => {
                if (isDirty) {
                  if (window.confirm("You have unsaved changes. Do you want to continue?")) {
                    setStep(idx)
                    setIsPreview(false)
                  }
                } else {
                  setStep(idx)
                  setIsPreview(false)
                }
              }}
              className={`cursor-pointer p-3 rounded-lg ${step === idx ? "bg-background text-primary font-semibold" : "text-primary-foreground hover:bg-primary-foreground/10"} transition duration-200`}
              role="button"
              tabIndex={0}
              aria-current={step === idx ? "step" : undefined}
            >
              {isSidebarOpen ? label : label.charAt(0)}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
        <Card className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              {isPreview ? "Preview Your Application" : "Loan Application Form"}
            </h1>
            {!isPreview && <p className="text-muted-foreground">Step {step + 1} of 7</p>}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {isPreview ? renderPreview() : renderStepContent()}
            {!isPreview && (
              <div className="mt-8 flex justify-between">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                  >
                    Back
                  </button>
                )}
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            )}
          </form>
        </Card>
      </div>

      {/* Help Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="fixed bottom-4 right-4 rounded-full">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Need help? Contact support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ApplicationFormVercel

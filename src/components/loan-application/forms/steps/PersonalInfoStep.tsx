"use client"

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { z } from "zod"
import type { applicationFormSchema } from "../../schemas/applicationSchemas"


type FormValues = z.infer<typeof applicationFormSchema>

interface PersonalInfoStepProps {
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  errors: FieldErrors<FormValues>
}

export default function PersonalInfoStep({ register, control, errors }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <Input
            {...register("userInfo.fullName")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter your full name"
          />
          {errors.userInfo?.fullName && <p className="text-red-500 text-sm mt-1">{errors.userInfo.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Father's Name</label>
          <Input
            {...register("userInfo.fatherName")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter father's name"
          />
          {errors.userInfo?.fatherName && (
            <p className="text-red-500 text-sm mt-1">{errors.userInfo.fatherName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
          <Input
            {...register("userInfo.motherName")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter mother's name"
          />
          {errors.userInfo?.motherName && (
            <p className="text-red-500 text-sm mt-1">{errors.userInfo.motherName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Spouse's Name</label>
          <Input
            {...register("userInfo.spouseName")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter spouse's name (optional)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <Input {...register("userInfo.dateOfBirth")} type="date" className="mt-1 w-full" />
          {errors.userInfo?.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.userInfo.dateOfBirth.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Place of Birth</label>
          <Input
            {...register("userInfo.placeOfBirth")}
            type="text"
            className="mt-1 w-full"
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
                <SelectTrigger className="mt-1 w-full">
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
          {errors.userInfo?.gender && <p className="text-red-500 text-sm mt-1">{errors.userInfo.gender.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Marital Status</label>
          <Controller
            control={control}
            name="userInfo.maritalStatus"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="mt-1 w-full">
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
          <Input {...register("userInfo.nid")} type="text" className="mt-1 w-full" placeholder="Enter your NID" />
          {errors.userInfo?.nid && <p className="text-red-500 text-sm mt-1">{errors.userInfo.nid.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <Input
            {...register("userInfo.mobileNumber")}
            type="tel"
            className="mt-1 w-full"
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
            className="mt-1 w-full"
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
            className="mt-1 w-full"
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
                <SelectTrigger className="mt-1 w-full">
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
            className="mt-1 w-full"
            placeholder="Enter approximate value"
          />
          {errors.userInfo?.approximateValue && (
            <p className="text-red-500 text-sm mt-1">{errors.userInfo.approximateValue.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

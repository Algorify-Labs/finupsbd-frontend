"use client"

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { z } from "zod"
import type { applicationFormSchema } from "../../schemas/applicationSchemas"

type FormValues = z.infer<typeof applicationFormSchema>

interface EmploymentStepProps {
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  errors: FieldErrors<FormValues>
}

export default function EmploymentStep({ register, control, errors }: EmploymentStepProps) {
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
                <SelectTrigger className="mt-1 w-full">
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
            className="mt-1 w-full"
            placeholder="Enter job title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employer Name</label>
          <Input
            {...register("employmentFinancialInfo.employerName")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter employer name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Office Address</label>
          <Input
            {...register("employmentFinancialInfo.officeAddress")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter office address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <Input
            {...register("employmentFinancialInfo.department")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter department"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Details</label>
          <Input
            {...register("employmentFinancialInfo.contactDetails")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter contact details"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <Input
            {...register("employmentFinancialInfo.businessName")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter business name (if applicable)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Registration Number</label>
          <Input
            {...register("employmentFinancialInfo.businessRegistrationNumber")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter registration number (if applicable)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employment Tenure (Years)</label>
          <Input
            {...register("employmentFinancialInfo.employmentTenureYears", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full"
            placeholder="Enter years"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Gross Income</label>
          <Input
            {...register("employmentFinancialInfo.monthlyGrossIncome", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full"
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
            className="mt-1 w-full"
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
            className="mt-1 w-full"
            placeholder="Enter profession"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Credit Score</label>
          <Input
            {...register("employmentFinancialInfo.currentCreditScore", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full"
            placeholder="Enter credit score"
          />
        </div>
      </div>
    </div>
  )
}

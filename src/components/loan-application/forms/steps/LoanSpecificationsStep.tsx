"use client"

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { z } from "zod"
import { applicationFormSchema } from "../../schemas/applicationSchemas"



type FormValues = z.infer<typeof applicationFormSchema>

interface LoanSpecificationsStepProps {
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  errors: FieldErrors<FormValues>
}

export default function LoanSpecificationsStep({ register, control, errors }: LoanSpecificationsStepProps) {
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
                <SelectTrigger className="mt-1 w-full">
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
            className="mt-1 w-full"
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
            className="mt-1 w-full"
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
            className="mt-1 w-full"
            placeholder="Enter tenure in months"
          />
          {errors.loanSpecifications?.preferredLoanTenure && (
            <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.preferredLoanTenure.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Proposed EMI Start Date</label>
          <Input {...register("loanSpecifications.proposedEMIStartDate")} type="date" className="mt-1 w-full" />
          {errors.loanSpecifications?.proposedEMIStartDate && (
            <p className="text-red-500 text-sm mt-1">{errors.loanSpecifications.proposedEMIStartDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Repayment Preferences</label>
          <Input
            {...register("loanSpecifications.repaymentPreferences")}
            type="text"
            className="mt-1 w-full"
            placeholder="Enter preferences (optional)"
          />
        </div>
      </div>
    </div>
  )
}

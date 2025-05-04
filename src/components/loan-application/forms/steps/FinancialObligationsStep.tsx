"use client"

import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import type { z } from "zod"
import { applicationFormSchema } from "../../schemas/applicationSchemas"


type FormValues = z.infer<typeof applicationFormSchema>

interface FinancialObligationsStepProps {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

export default function FinancialObligationsStep({ register, errors }: FinancialObligationsStepProps) {
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
            className="mt-1 w-full"
            placeholder="Enter description (e.g., Car Loan)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <Input
            {...register("financialObligations.amount", { valueAsNumber: true })}
            type="number"
            className="mt-1 w-full"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  )
}

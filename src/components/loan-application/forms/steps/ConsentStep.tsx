"use client"

import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import type { z } from "zod"
import type { applicationFormSchema } from "../../schemas/applicationSchemas"

type FormValues = z.infer<typeof applicationFormSchema>

interface ConsentStepProps {
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

export default function ConsentStep({ register, errors }: ConsentStepProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Consent and Declaration</h2>

      <div className="space-y-4">
        <h3 className="font-medium">Applicant Consent and Authorization</h3>
        <div className="flex items-start space-x-2">
          <div className="flex flex-col">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300"
                {...register("consentAndDeclaration.consent")}
              />
              <label className="text-sm leading-relaxed">
                I authorize the bank to conduct verification checks, contact my employer, validate my identity with
                government databases, and perform credit evaluations as required.
              </label>
            </div>
            {errors.consentAndDeclaration?.consent && (
              <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration.consent.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Privacy Agreement</h3>
        <div className="flex items-start space-x-2">
          <div className="flex flex-col">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300"
                {...register("consentAndDeclaration.privacy")}
              />
              <label className="text-sm leading-relaxed">
                I acknowledge that the bank will use my data solely for processing and compliance, adhering to data
                privacy regulations locally and internationally.
              </label>
            </div>
            {errors.consentAndDeclaration?.privacy && (
              <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration.privacy.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Non-Disclosure Agreement</h3>
        <div className="flex items-start space-x-2">
          <div className="flex flex-col">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300"
                {...register("consentAndDeclaration.nda")}
              />
              <label className="text-sm leading-relaxed">
                I understand my data will remain private and undisclosed except as mandated by regulatory authorities.
              </label>
            </div>
            {errors.consentAndDeclaration?.nda && (
              <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration.nda.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Declaration of Accuracy</h3>
        <div className="flex items-start space-x-2">
          <div className="flex flex-col">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300"
                {...register("consentAndDeclaration.accuracy")}
              />
              <label className="text-sm leading-relaxed">
                I confirm that all details provided are true to the best of my knowledge.
              </label>
            </div>
            {errors.consentAndDeclaration?.accuracy && (
              <span className="text-sm text-red-500 mt-1">{errors.consentAndDeclaration.accuracy.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Digital Signature (Type full name as e-signature)</label>
          <Input type="text" placeholder="Your Full Name" {...register("consentAndDeclaration.signature")} />
          {errors.consentAndDeclaration?.signature && (
            <span className="text-sm text-red-500">{errors.consentAndDeclaration.signature.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
          <Input type="date" {...register("consentAndDeclaration.date")} />
          {errors.consentAndDeclaration?.date && (
            <span className="text-sm text-red-500">{errors.consentAndDeclaration.date.message}</span>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Financial data is encrypted and accessed strictly under privacy policies. Only credit assessment personnel may
          view this information.
        </p>
      </div>
    </div>
  )
}

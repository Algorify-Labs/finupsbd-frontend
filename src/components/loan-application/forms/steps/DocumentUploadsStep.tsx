"use client"

import type React from "react"

import type { UseFormRegister, UseFormWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import type { z } from "zod"
import type { applicationFormSchema } from "../../schemas/applicationSchemas"

type FormValues = z.infer<typeof applicationFormSchema>

interface DocumentUploadsStepProps {
  register: UseFormRegister<FormValues>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, docType: string) => void
  previews: { [docType: string]: string }
  watch: UseFormWatch<FormValues>
}

export default function DocumentUploadsStep({ register, handleFileChange, previews, watch }: DocumentUploadsStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Document Uploads</h2>
      <p className="text-gray-600 mb-4">Upload required documents (PDF, JPEG, PNG formats only, max 5MB each)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">National ID</label>
          <Input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => handleFileChange(e, "NATIONAL_ID")}
            className="mt-2 w-full text-sm text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Upload a clear copy of your National ID card</p>
        </div>
        <div>
          {previews["NATIONAL_ID"] && (
            <div>
              <p className="text-sm font-medium text-gray-700">Preview:</p>
              <div className="mt-2 relative h-48 w-48 border border-gray-300 rounded-lg overflow-hidden">
                <Image
                  src={previews["NATIONAL_ID"] || "/placeholder.svg"}
                  alt="National ID Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Passport Photo</label>
          <Input
            type="file"
            accept=".jpeg,.jpg,.png"
            onChange={(e) => handleFileChange(e, "PASSPORT_PHOTO")}
            className="mt-2 w-full text-sm text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Upload a recent passport-sized photo</p>
        </div>
        <div>
          {previews["PASSPORT_PHOTO"] && (
            <div>
              <p className="text-sm font-medium text-gray-700">Preview:</p>
              <div className="mt-2 relative h-48 w-48 border border-gray-300 rounded-lg overflow-hidden">
                <Image
                  src={previews["PASSPORT_PHOTO"] || "/placeholder.svg"}
                  alt="Passport Photo Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Income Proof</label>
          <Input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => handleFileChange(e, "INCOME_PROOF")}
            className="mt-2 w-full text-sm text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">Upload salary slips or bank statements</p>
        </div>
        <div>
          {previews["INCOME_PROOF"] && (
            <div>
              <p className="text-sm font-medium text-gray-700">Preview:</p>
              <div className="mt-2 relative h-48 w-48 border border-gray-300 rounded-lg overflow-hidden">
                <Image
                  src={previews["INCOME_PROOF"] || "/placeholder.svg"}
                  alt="Income Proof Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import type { z } from "zod"
import { applicationFormSchema } from "../../schemas/applicationSchemas"


type ApplicationFormValues = z.infer<typeof applicationFormSchema>

interface PreviewSectionProps {
  title: string
  data: Record<string, any>
  onEdit: () => void
}

export default function PreviewSection({ title, data, onEdit }: PreviewSectionProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button onClick={onEdit} className="text-primary hover:underline mt-2 sm:mt-0 text-sm font-medium">
          Edit
        </button>
      </div>
      <div className="mt-2 space-y-1">
        {Object.entries(data).map(([key, value]) => {
          // Skip rendering if value is undefined, null, or an empty array
          if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
            return null
          }

          // Format the key for display
          const formattedKey = key
            .replace(/([A-Z])/g, " $1") // Add space before capital letters
            .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter

          // Handle different value types
          let displayValue = value
          if (typeof value === "object" && !Array.isArray(value)) {
            displayValue = "Object" // Don't try to display nested objects directly
          } else if (Array.isArray(value)) {
            displayValue = value.join(", ")
          } else if (typeof value === "boolean") {
            displayValue = value ? "Yes" : "No"
          }

          return (
            <p key={key}>
              <strong>{formattedKey}:</strong> {displayValue}
            </p>
          )
        })}
      </div>
    </div>
  )
}

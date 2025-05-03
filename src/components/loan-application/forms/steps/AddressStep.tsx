"use client"

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { z } from "zod"
import type { applicationFormSchema } from "../../schemas/applicationSchemas"

type FormValues = z.infer<typeof applicationFormSchema>

interface AddressStepProps {
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  errors: FieldErrors<FormValues>
}

export default function AddressStep({ register, control, errors }: AddressStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Residential Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">House/Flat No</label>
          <Input
            {...register("address.houseFlatNo")}
            type="text"
            className="mt-1 w-full"
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
            className="mt-1 w-full"
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
            className="mt-1 w-full"
            placeholder="Enter area/locality"
          />
          {errors.address?.areaLocality && (
            <p className="text-red-500 text-sm mt-1">{errors.address.areaLocality.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <Input {...register("address.city")} type="text" className="mt-1 w-full" placeholder="Enter city" />
          {errors.address?.city && <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <Input {...register("address.district")} type="text" className="mt-1 w-full" placeholder="Enter district" />
          {errors.address?.district && <p className="text-red-500 text-sm mt-1">{errors.address.district.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
          <Input
            {...register("address.postalCode")}
            type="text"
            className="mt-1 w-full"
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
            className="mt-1 w-full"
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
                <SelectTrigger className="mt-1 w-full">
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
}

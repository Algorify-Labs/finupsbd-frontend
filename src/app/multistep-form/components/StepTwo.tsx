"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export function StepTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label>Email</Label>
        <Input {...register("email")} />
        <p className="text-sm text-red-500">
          {errors.email?.message ? String(errors.email.message) : ""}
        </p>
      </div>
      <div>
        <Label>Phone</Label>
        <Input {...register("phone")} />
        <p className="text-sm text-red-500">
          {errors.phone?.message ? String(errors.phone.message) : ""}
        </p>
      </div>
    </div>
  );
}

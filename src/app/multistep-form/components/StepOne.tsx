"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label>First Name</Label>
        <Input {...register("firstName")} />
        <p className="text-sm text-red-500">
          {errors.firstName?.message?.toString()}
        </p>
      </div>
      <div>
        <Label>Last Name</Label>
        <Input {...register("lastName")} />
        <p className="text-sm text-red-500">
          {errors.lastName?.message?.toString()}
        </p>
      </div>
    </div>
  );
}

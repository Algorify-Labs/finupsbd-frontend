"use client";

import { TextInput } from "@/components/form/FormInpts";
import { UseFormReturn } from "react-hook-form";
import { FullFormSchema } from "./schema";

export const StepOne = ({ form }: { form: UseFormReturn<FullFormSchema> }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <TextInput form={form} name="firstName" label="First Name" required />
    <TextInput form={form} name="lastName" label="Last Name" required />
  </div>
);

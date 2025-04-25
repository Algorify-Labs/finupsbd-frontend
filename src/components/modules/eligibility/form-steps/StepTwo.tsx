"use client";

import { TextInput } from "@/components/form/FormInpts";
import { UseFormReturn } from "react-hook-form";
import { FullFormSchema } from "./schema";

export const StepTwo = ({ form }: { form: UseFormReturn<FullFormSchema> }) => (
  <div className="space-y-4">
    <TextInput form={form} name="email" label="Email" type="email" required />
    <TextInput form={form} name="phone" label="Phone" type="tel" required />
  </div>
);

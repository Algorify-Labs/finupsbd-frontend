"use client";

import { TextInput } from "@/components/form/FormInputs";
import { UseFormReturn } from "react-hook-form";
import { FullFormSchema } from "./schema";

export const StepThree = ({
  form,
}: {
  form: UseFormReturn<FullFormSchema>;
}) => (
  <div className="space-y-4">
    <TextInput
      form={form}
      name="name"
      label="Your Name"
      placeholder="Enter your name"
      required
    />
    <TextInput
      form={form}
      name="email"
      label="Your Email Address"
      placeholder="Enter email address"
      type="email"
      required
    />
    <TextInput
      form={form}
      name="phone"
      label="Phone"
      type="tel"
      placeholder="01XXXXXXXXX"
      required
    />
  </div>
);

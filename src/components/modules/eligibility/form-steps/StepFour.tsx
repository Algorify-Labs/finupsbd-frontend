"use client";

import { UseFormReturn } from "react-hook-form";
import { FullFormSchema } from "./schema";

export const StepFour = ({ form }: { form: UseFormReturn<FullFormSchema> }) => {
  const values = form.getValues();

  return (
    <div className="space-y-2">
      {Object.entries(values).map(([key, val]) => (
        <p key={key}>
          <strong>{key}:</strong> {String(val)}
        </p>
      ))}
    </div>
  );
};

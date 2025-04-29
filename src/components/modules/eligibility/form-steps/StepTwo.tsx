"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FullFormSchema } from "./schema";

import { SelectInput, TextInput } from "@/components/form/FormInputs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";

const loanTypeOptions = [
  { label: "Personal Loan", value: "PERSONAL" },
  { label: "Car Loan", value: "CAR" },
  { label: "Home Loan", value: "HOME" },
];

export const StepTwo = ({ form }: { form: UseFormReturn<FullFormSchema> }) => {
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "loans",
  });

  const watchHasLoan = form.watch("haveAnyLoan");

  const watchNumberOfLoans = form.watch("numberOfLoans");

  // Effectively rebuild loans array when number of loans change
  useEffect(() => {
    if (
      form.getValues("haveAnyLoan") === "YES" &&
      typeof watchNumberOfLoans === "number"
    ) {
      const newLoans = Array.from({ length: watchNumberOfLoans }, () => ({
        loanType: "",
        loanAmount: 0,
      }));
      replace(newLoans);
    }
  }, [watchNumberOfLoans, form, replace]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Radio Group for "Do you have loans?" */}
      <div className="space-y-2">
        <Label className="text-base">Do you have any loans?</Label>
        <RadioGroup
          value={form.watch("haveAnyLoan")}
          onValueChange={(value) => {
            form.setValue("haveAnyLoan", value as "YES" | "NO", {
              shouldValidate: true,
            });
            if (value === "NO") {
              form.setValue("numberOfLoans", undefined);
              replace([]);
            }
          }}
          className="flex gap-8"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="YES" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NO" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Select Number of Loans if YES */}
      {form.watch("haveAnyLoan") === "YES" && (
        <>
          <SelectInput
            form={form}
            name="numberOfLoans"
            label="How many loans?"
            placeholder="Select number"
            options={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
            ]}
            required
          />

          {/* Dynamic Loan Fields */}
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-lg border p-4">
              <SelectInput
                form={form}
                name={`loans.${index}.loanType`}
                label={`Loan Type ${index + 1}`}
                placeholder="Select Loan Type"
                options={loanTypeOptions}
                required
              />
              <TextInput
                form={form}
                name={`loans.${index}.loanAmount`}
                label={`Loan Amount ${index + 1}`}
                placeholder="Enter Amount"
                type="text"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  form.setValue(`loans.${index}.loanAmount`, value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  form.trigger(`loans.${index}.loanAmount`); // <=== important to revalidate manually
                }}
                required
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

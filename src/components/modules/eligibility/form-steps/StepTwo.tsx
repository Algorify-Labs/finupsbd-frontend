"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FullFormSchema } from "./schema";

import { SelectInput, TextInput } from "@/components/form/FormInputs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

const loanTypeOptions = [
  { label: "Personal Loan", value: "PERSONAL_LOAN" },
  { label: "Home Loan", value: "HOME_LOAN" },
  { label: "Car Loan", value: "CAR_LOAN" },
  { label: "SME Loan", value: "SME_LOAN" },
];

const numberOfLoans = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

const numberOfCreditCards = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

export const StepTwo = ({ form }: { form: UseFormReturn<FullFormSchema> }) => {
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "existingLoans",
  });

  const watchNumberOfLoans = form.watch("numberOfLoans");
  const watchNumberOfCreditCards = form.watch("numberOfCreditCards");

  // Effectively rebuild loans array when number of loans change
  useEffect(() => {
    if (
      form.getValues("haveAnyLoan") === "YES" &&
      typeof watchNumberOfLoans === "number"
    ) {
      const newLoans = Array.from({ length: watchNumberOfLoans }, () => ({
        existingLoanType: "",
        loanOutstanding: 0,
        emiAmount: 0,
        interestRate: 0,
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
          value={String(form.watch("haveAnyLoan"))}
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
            label="Number of loans you have"
            placeholder="Select number of loans"
            options={numberOfLoans}
            required
          />

          {/* Dynamic Loan Fields */}
          {fields.map((field, index) => (
            <div key={field.id}>
              <p className="mb-2 text-base font-bold text-primary">
                Loan {index + 1}
              </p>
              <div className="mb-2 rounded-md border p-4">
                <div className="grid grid-cols-2 gap-4">
                  <SelectInput
                    form={form}
                    name={`existingLoans.${index}.existingLoanType`}
                    label="Loan Type"
                    placeholder="Select Loan Type"
                    options={loanTypeOptions}
                    required
                  />
                  <TextInput
                    form={form}
                    name={`existingLoans.${index}.loanOutstanding`}
                    label="Loan Outstanding (BDT)"
                    placeholder="Enter Amount"
                    type="text"
                    icon={<TbCurrencyTaka size={20} />}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      form.setValue(
                        `existingLoans.${index}.loanOutstanding`,
                        value,
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        },
                      );
                      form.trigger(`existingLoans.${index}.loanOutstanding`); // <=== important to revalidate manually
                    }}
                    required
                  />
                  <TextInput
                    form={form}
                    name={`existingLoans.${index}.emiAmount`}
                    label="EMI Amout (BDT)"
                    placeholder="Enter Amount"
                    type="text"
                    icon={<TbCurrencyTaka size={20} />}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      form.setValue(`existingLoans.${index}.emiAmount`, value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      form.trigger(`existingLoans.${index}.emiAmount`); // <=== important to revalidate manually
                    }}
                    required
                  />
                  <TextInput
                    form={form}
                    name={`existingLoans.${index}.interestRate`}
                    label="Interest Rate (%)"
                    placeholder="Enter Amount"
                    type="number"
                    icon={<TbCurrencyTaka size={20} />}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      form.setValue(
                        `existingLoans.${index}.interestRate`,
                        value,
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        },
                      );
                      form.trigger(`existingLoans.${index}.interestRate`); // <=== important to revalidate manually
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Radio Group for "Do you have loans?" */}
      <div className="mt-4 space-y-2">
        <Label className="text-base">Do you have any credit card?</Label>
        <RadioGroup
          value={String(form.watch("haveAnyCreditCard"))}
          onValueChange={(value) => {
            form.setValue("haveAnyCreditCard", value as "YES" | "NO", {
              shouldValidate: true,
            });
            if (value === "NO") {
              form.setValue("numberOfCreditCards", undefined);
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

      {form.watch("haveAnyCreditCard") === "YES" && (
        <>
          <SelectInput
            form={form}
            name="numberOfCreditCards"
            label="Number of credit cards you have?"
            placeholder="Select number of cards"
            options={numberOfCreditCards}
            required
          />
        </>
      )}
    </div>
  );
};

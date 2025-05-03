"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FullFormSchema } from "./schema";

import { SelectInput, TextInput } from "@/components/form/FormInputs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPinHouse } from "lucide-react";
import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDebounce } from "use-debounce";

const loanTypeOptions = [
  { label: "Personal Loan", value: "PERSONAL_LOAN" },
  { label: "Home Loan", value: "HOME_LOAN" },
  { label: "Car Loan", value: "CAR_LOAN" },
  { label: "SME Loan", value: "SME_LOAN" },
  { label: "Finups Agrim", value: "INSTANT_LOAN" },
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
  const [showPropertyMessage, setShowPropertyMessage] = useState(false);
  const [showIncomeMessage, setShowIncomeMessage] = useState(false);
  const [rentalAreaInput, setRentalAreaInput] = useState("");
  const [debouncedRentalArea] = useDebounce(rentalAreaInput, 700); // 500ms delay
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
        emiAmountBDT: 0,
        interestRate: 0,
      }));
      replace(newLoans);
    }
  }, [watchNumberOfLoans, form, replace]);

  useEffect(() => {
    if (debouncedRentalArea.length > 0) {
      setShowPropertyMessage(true);
    } else {
      setShowPropertyMessage(false);
    }

    if (debouncedRentalArea.trim().endsWith(",")) {
      setShowIncomeMessage(true);
    } else {
      setShowIncomeMessage(false);
    }
  }, [debouncedRentalArea]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Radio Group for "Do you have loans?" */}
      <div className="mb-4 space-y-2">
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
            label="Number of Loans You Have"
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
                      const inputValue = Number(e.target.value);
                      if (!isNaN(inputValue)) {
                        form.setValue(
                          `existingLoans.${index}.loanOutstanding`,
                          inputValue,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );
                      } else {
                        form.setValue(
                          `existingLoans.${index}.loanOutstanding`,
                          0,
                        );
                      }
                      form.trigger(`existingLoans.${index}.loanOutstanding`);
                    }}
                    required
                  />
                  <TextInput
                    form={form}
                    name={`existingLoans.${index}.emiAmountBDT`}
                    label="EMI Amout (BDT)"
                    placeholder="Enter Amount"
                    type="text"
                    icon={<TbCurrencyTaka size={20} />}
                    onChange={(e) => {
                      const inputValue = Number(e.target.value);
                      if (!isNaN(inputValue)) {
                        form.setValue(
                          `existingLoans.${index}.emiAmountBDT`,
                          inputValue,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );
                      } else {
                        form.setValue(`existingLoans.${index}.emiAmountBDT`, 0);
                      }
                      form.trigger(`existingLoans.${index}.emiAmountBDT`);
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
                      const inputValue = parseFloat(e.target.value);
                      if (!isNaN(inputValue)) {
                        form.setValue(
                          `existingLoans.${index}.interestRate`,
                          inputValue,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );
                      } else {
                        form.setValue(`existingLoans.${index}.interestRate`, 0);
                      }
                      form.trigger(`existingLoans.${index}.interestRate`);
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
          className="flex gap-8"
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
        <div className="mt-2 grid grid-cols-2 gap-4">
          <SelectInput
            form={form}
            name="numberOfCreditCards"
            label="Number of credit cards you have?"
            placeholder="Select number of cards"
            options={numberOfCreditCards}
            required
          />
          <div>
            <TextInput
              form={form}
              name="cardLimitBDT"
              label="Card Limit (BDT)"
              type="text"
              placeholder="Enter limit amount"
              onChange={(e) => {
                const inputValue = Number(e.target.value);
                if (!isNaN(inputValue)) {
                  form.setValue("cardLimitBDT", inputValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                } else {
                  form.setValue("cardLimitBDT", 0);
                }
                form.trigger("cardLimitBDT");
              }}
              maxLength={10}
              icon={<TbCurrencyTaka size={20} />}
              required
            />
            {(form.watch("numberOfCreditCards") ?? 0) > 1 && (
              <p className="w-full rounded-md border border-primary bg-[#E7FDE2] p-2 text-xs font-medium text-green-950">
                If you have more than 1 card, please provide the total credit
                limit by summing the limit of each individual card.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Radio Group for "Do you have loans?" */}
      <div className="mt-4 space-y-2">
        <Label className="text-base">Do you have any rental income?</Label>
        <RadioGroup
          className="flex gap-8"
          value={String(form.watch("haveAnyRentalIncome"))}
          onValueChange={(value) => {
            form.setValue("haveAnyRentalIncome", value as "YES" | "NO", {
              shouldValidate: true,
            });
          }}
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

      {form.watch("haveAnyRentalIncome") === "YES" && (
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <TextInput
              form={form}
              name="rentalArea"
              label="Rental Property Area"
              type="text"
              placeholder="Enter rental property area"
              icon={<MapPinHouse size={20} />}
              onChange={(e) => setRentalAreaInput(e.target.value)}
            />
            {showPropertyMessage && (
              <p className="w-full rounded-md border border-primary bg-[#E7FDE2] p-2 text-xs font-medium text-green-950">
                If property area more than 1, please type the area with comma
                separated. For example: Dhaka, Chattogram.
              </p>
            )}
          </div>
          <div>
            <TextInput
              form={form}
              name="rentalIncome"
              label="Monthly Rental Income (BDT)"
              type="text"
              placeholder="Enter rental income amount"
              onChange={(e) => {
                const inputValue = Number(e.target.value);
                if (!isNaN(inputValue)) {
                  form.setValue("rentalIncome", inputValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                } else {
                  form.setValue("rentalIncome", 0);
                }
                form.trigger("rentalIncome");
              }}
              maxLength={10}
              icon={<TbCurrencyTaka size={20} />}
              required
            />
            {showIncomeMessage && (
              <p className="w-full rounded-md border border-primary bg-[#E7FDE2] p-2 text-xs font-medium leading-[18px] text-green-950">
                If you have more than multiple rental property, please provide
                the total rental income by summing the income of each individual
                property.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

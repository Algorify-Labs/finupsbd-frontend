"use client";

import {
  DatePickerInput,
  SelectInput,
  TextInput,
} from "@/components/form/FormInputs";
import { Percent } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { TbCurrencyTaka } from "react-icons/tb";
import {
  businessOwnerOptions,
  businessTypeOptions,
  districts,
  genderOptions,
  professionOptions,
  tenureOptions,
  tradeLicenseExperieOptions,
} from "./form-data-oprions";
import { FullFormSchema } from "./schema";

export const StepOne = ({ form }: { form: UseFormReturn<FullFormSchema> }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <SelectInput
      form={form}
      name="gender"
      label="Gender"
      placeholder="Select Gender"
      options={genderOptions}
      required
    />

    <DatePickerInput
      form={form}
      label="Date of Birth"
      name="dateOfBirth"
      required
    />

    <SelectInput
      form={form}
      name="profession"
      label="Your Profession"
      placeholder="Select Profession"
      options={professionOptions}
      required
    />
    <SelectInput
      form={form}
      name="jobLocation"
      label={`${["BUSINESS_OWNER", "SELF_EMPLOYED"].includes(form.watch("profession")) ? "Business Locaton" : "Job Location"} `}
      placeholder="Select Location"
      options={districts}
      required
    />

    {/* Only show if "Business Owner" */}

    {["BUSINESS_OWNER", "SELF_EMPLOYED"].includes(form.watch("profession")) && (
      <>
        <SelectInput
          form={form}
          name="businessOwnerType"
          label="Business Owner Type"
          placeholder="Select Owner Type"
          options={businessOwnerOptions}
          required
        />
        <SelectInput
          form={form}
          name="businessType"
          label="Business Type"
          placeholder="Select Type"
          options={businessTypeOptions}
          required
        />
        <TextInput
          form={form}
          name="sharePortion"
          label="Share Portion (%)"
          type="text"
          placeholder="Enter share portion"
          onChange={(e) =>
            form.setValue("sharePortion", Number(e.target.value))
          }
          icon={<Percent className="h-4" />}
          required
        />
        <SelectInput
          form={form}
          name="tradeLicenseAge"
          label="Trade License Age"
          placeholder="Select Year"
          options={tradeLicenseExperieOptions}
          required
        />
      </>
    )}

    <TextInput
      form={form}
      name="monthlyIncome"
      label="Monthly Income (BDT)"
      type="text"
      placeholder="Enter monthly income "
      onChange={(e) => form.setValue("monthlyIncome", Number(e.target.value))}
      maxLength={10}
      icon={<TbCurrencyTaka size={20} />}
      required
    />
    <SelectInput
      form={form}
      name="expectedLoanTenure"
      label="Expected Loan Tenure (Month)"
      placeholder="Select Tenure"
      options={tenureOptions}
      required
    />
  </div>
);

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { cleanFormData } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StepOne } from "./form-steps/StepOne";
import { StepThree } from "./form-steps/StepThree";
import { StepTwo } from "./form-steps/StepTwo";
import {
  fullFormSchema,
  FullFormSchema,
  stepOneSchema,
  stepTwoSchema,
} from "./form-steps/schema";

interface EligibilityCheckProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  loanType: string; // e.g. 'PERSONAL_LOAN'
}

function EligibilityCheckModal({
  open,
  onOpenChange,
  loanType,
}: EligibilityCheckProps) {
  const [step, setStep] = useState(0);

  const form = useForm<FullFormSchema>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      // gender: "",
      // dateOfBirth: new Date(),
      // profession: "",
      // jobLocation: "",
      // businessOwnerType: "",
      // businessType: "",
      // tradeLicenseAge: 1,
      // // monthlyIncome: 30000,
      // expectedLoanTenure: 12,
      // sharePortion: 0,
      // fullName: "",
      // email: "",
      // phone: "",
    },
    mode: "onTouched",
  });

  const steps = [
    <StepOne key="step1" form={form} />,
    <StepTwo key="step2" form={form} />,
    <StepThree key="step3" form={form} />,
  ];

  const validateStep = async () => {
    const schema =
      step === 0 ? stepOneSchema : step === 1 ? stepTwoSchema : fullFormSchema;
    const valid = await form.trigger(
      Object.keys(
        "shape" in schema ? schema.shape : schema._def.schema.shape,
      ) as Array<keyof FullFormSchema>,
    );
    return valid;
  };

  const onSubmit = (data: FullFormSchema) => {
    let cleanedData = { ...data };

    if (
      data.profession !== "BUSINESS_OWNER" &&
      data.profession !== "SELF_EMPLOYED"
    ) {
      delete cleanedData.businessOwnerType;
      delete cleanedData.businessType;
      delete cleanedData.sharePortion;
      delete cleanedData.tradeLicenseAge;
    }

    // Final cleaning to remove any empty fields
    const finalData = cleanFormData(cleanedData);

    console.log("Submitted data:", finalData);
    alert("Submitted! Check console.");
  };

  const renderStepIndicator = () => {
    const stepPercentage = (step / 2) * 100;
    const formSteps = [
      { stepNumber: 0, title: "Step 1", description: "Personal Info" },
      { stepNumber: 1, title: "Step 2", description: "Financial Details" },
      { stepNumber: 2, title: "Step 3", description: "Contact Info" },
    ];
    return (
      <div className="px-0 lg:px-4">
        <div className="relative mb-2 px-10">
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="absolute left-0 right-0 top-[10px] mx-auto h-[4px] w-full -translate-y-1/2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${stepPercentage}%` }}
              />
            </div>
            {formSteps.map((formStep) => {
              const isCompleted = formStep.stepNumber < step;
              const isCurrent = formStep.stepNumber === step;

              return (
                <div
                  key={formStep.stepNumber}
                  className="group relative flex flex-col items-center"
                >
                  <div
                    className={cn(
                      "relative flex h-5 w-5 transform items-center justify-center rounded-full border-2 transition-all duration-300",
                      isCompleted &&
                        "border-primary bg-primary ring-4 ring-primary/30",
                      isCurrent &&
                        "border-primary bg-primary ring-4 ring-primary/30",
                      !isCompleted && !isCurrent && "border-gray-300 bg-white",
                    )}
                  >
                    {isCompleted ? (
                      <div className="h-2 w-2 rounded-full bg-white ring-4 ring-primary/30 transition-colors"></div>
                    ) : (
                      <div className="text-center">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            isCurrent ? "bg-white" : "bg-gray-300",
                          )}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-0 mt-4 flex w-full items-center justify-between px-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {formSteps.map((formStep) => {
            return (
              <div key={formStep.stepNumber} className="text-center">
                <h4 className="mb-1 font-bold text-primary">
                  {formStep.title}
                </h4>
                <p className="text-sm">{formStep.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      aria-describedby="loan-description"
    >
      <DialogContent
        className="max-w-2xl rounded-lg"
        onInteractOutside={(e) => {
          e.preventDefault(); // Keep if you want to prevent outside click closing. Remove otherwise.
        }}
      >
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">
            Find the best Personal Loan for you
          </DialogTitle>

          <DialogDescription className="text-center text-sm text-tertiary-primary">
            Please provide your information to check your loan eligibility.
          </DialogDescription>

          <div className="pt-8">{renderStepIndicator()}</div>
        </DialogHeader>

        <ScrollArea className="max-h-96">
          <Card className="w-full border-none p-6 text-left shadow-none">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {steps[step]}

                <div className="mt-8 flex justify-between">
                  {step > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="pl-2"
                      onClick={() => setStep(step - 1)}
                    >
                      <ChevronLeft />
                      Back
                    </Button>
                  )}
                  {step < steps.length - 1 ? (
                    <Button
                      type="button"
                      className="pr-2"
                      onClick={async () => {
                        const valid = await validateStep();
                        if (valid) setStep(step + 1);
                      }}
                    >
                      Next
                      <ChevronLeft className="rotate-180" />
                    </Button>
                  ) : (
                    <Button type="submit">Submit</Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default EligibilityCheckModal;

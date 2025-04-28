"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { StepOne } from "./components/StepOne";
import { StepThree } from "./components/StepThree";
import { StepTwo } from "./components/StepTwo";
import {
  fullFormSchema,
  stepOneSchema,
  stepTwoSchema,
} from "./components/schema";

type FormData = z.infer<typeof fullFormSchema>;

const steps = [
  <StepOne key="step-one" />,
  <StepTwo key="step-two" />,
  <StepThree key="step-three" />,
];

export default function MultiStepFormPage() {
  const [step, setStep] = useState(0);
  const methods = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const next = async () => {
    const partialSchema =
      step === 0 ? stepOneSchema : step === 1 ? stepTwoSchema : fullFormSchema;
    const isValid = await methods.trigger(
      Object.keys(partialSchema.shape) as Array<keyof FormData>,
    );
    if (isValid) setStep((prev) => prev + 1);
  };

  const back = () => setStep((prev) => prev - 1);

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    alert("Form submitted! Check console.");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-6 p-6"
      >
        <h1 className="text-xl font-bold">Multi Step Form</h1>
        {steps[step]}

        <div className="flex justify-between pt-4">
          {step > 0 && <Button onClick={back}>Back</Button>}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

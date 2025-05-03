"use client";

import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { FullFormSchema } from "./schema";
import icon_success from "/public/icon-success.svg";

export const StepFour = ({ form }: { form: UseFormReturn<FullFormSchema> }) => {
  const values = form.getValues();

  return (
    <>
      <div>
        {/* {Object.entries(values).map(([key, val]) => (
        <p key={key}>
          <strong>{key}:</strong> {String(val)}
        </p>
      ))} */}
      </div>

      <div className="py-6 text-center">
        <Image src={icon_success} alt="Icon" className="mx-auto mb-4 w-20" />
        <h2 className="mb-6 text-2xl font-bold uppercase text-primary">
          Thanks, for fill up the form.
        </h2>
        <div className="space-y-2">
          <p className="font-semibold leading-7">
            Please click{" "}
            <span className="font-bold text-primary">"Check Eligibility"</span>{" "}
            for eligibility check.
          </p>
          <p className="font-semibold leading-7">
            If you want to change data or review your form again please click{" "}
            <span className="font-bold text-primary">"Back"</span>.
          </p>
        </div>
      </div>
    </>
  );
};

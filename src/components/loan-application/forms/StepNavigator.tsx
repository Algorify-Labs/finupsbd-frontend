"use client";

import { cn } from "@/lib/utils";

interface StepNavigatorProps {
  currentStep: number;
  stepTitles: string[];
  onStepChange: (step: number) => void;
}

export default function StepNavigator({
  currentStep,
  stepTitles,
  onStepChange,
}: StepNavigatorProps) {
  return (
    <ul className="mt-6 space-y-4 px-0">
      {stepTitles.map((title, index) => (
        <li
          key={index}
          onClick={() => onStepChange(index)}
          className={cn(
            "cursor-pointer rounded-lg p-3 transition duration-200",
            currentStep === index
              ? "bg-green-lighter border-l-4 font-semibold !text-primary"
              : "",
          )}
          role="button"
          tabIndex={0}
          aria-current={currentStep === index ? "step" : undefined}
        >
          {title}
        </li>
      ))}
    </ul>
  );
}

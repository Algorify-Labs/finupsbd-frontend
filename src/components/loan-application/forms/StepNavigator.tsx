"use client"

import { cn } from "@/lib/utils"

interface StepNavigatorProps {
  currentStep: number
  stepTitles: string[]
  onStepChange: (step: number) => void
  isSidebarOpen: boolean
}

export default function StepNavigator({ currentStep, stepTitles, onStepChange, isSidebarOpen }: StepNavigatorProps) {
  return (
    <ul className="mt-6 space-y-4 px-2 md:px-4">
      {stepTitles.map((title, index) => (
        <li
          key={index}
          onClick={() => onStepChange(index)}
          className={cn(
            "cursor-pointer p-3 rounded-lg transition duration-200",
            currentStep === index
              ? "bg-background text-primary font-semibold"
              : "text-primary-foreground hover:bg-primary-foreground/10",
          )}
          role="button"
          tabIndex={0}
          aria-current={currentStep === index ? "step" : undefined}
        >
          {isSidebarOpen ? title : title.charAt(0)}
        </li>
      ))}
    </ul>
  )
}

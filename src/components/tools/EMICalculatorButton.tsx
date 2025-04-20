"use client";
import EmiCalculator from "./EMICalculator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EMICalculatorButton = () => {
  return (
    <div
      className="fixed right-0 top-1/2 z-50 origin-top-right rotate-90 cursor-pointer rounded-bl-md bg-gradient-to-br from-red-600 to-red-500 px-6 py-2 text-sm font-semibold tracking-wider text-white shadow-xl transition-all hover:scale-105 hover:brightness-110 lg:text-base"
      title="View EMI Calculator"
    >
      <Dialog>
        <DialogTrigger>
          <span className="inline-block">💸 EMI Calculator</span>
        </DialogTrigger>
        <DialogContent
          className="w-full lg:max-w-3xl"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="mb-2 text-center text-3xl font-bold tracking-tight">
              EMI Calculator
            </DialogTitle>
            <DialogDescription className="mx-auto max-w-lg text-center text-sm text-muted-foreground">
              Easily calculate your monthly loan installment based on the
              disbursement date, loan amount, interest rate, and loan period.
            </DialogDescription>
          </DialogHeader>
          <EmiCalculator />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EMICalculatorButton;

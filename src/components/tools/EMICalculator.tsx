"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function EmiCalculator() {
  const [inputData, setInputData] = useState({
    disbursementDate: "2025-01-02",
    loanAmount: "300000",
    numberOfMonths: 12,
    interestRate: "10.05",
  });

  const [outputData, setOutputData] = useState({
    disbursementDate: "02 Jan 2025",
    loanAmount: "BDT 300,000.00",
    numberOfSchedule: 12,
    interestRate: "10.05 %",
    emiAmount: "26381.74",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [id]: id === "numberOfMonths" ? Number(value) : value,
    }));
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="rounded-t-xl bg-primary px-4 py-3">
            <CardTitle className="text-lg font-semibold text-white">
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            <div className="space-y-2">
              <Label htmlFor="disbursementDate">Disbursement Date</Label>
              <Input
                id="disbursementDate"
                type="date"
                value={inputData.disbursementDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount (BDT)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={inputData.loanAmount}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfMonths">Loan Term (Months)</Label>
              <Input
                id="numberOfMonths"
                type="number"
                value={inputData.numberOfMonths}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                value={inputData.interestRate}
                onChange={handleChange}
              />
            </div>
            <div className="pt-2">
              <Button
                onClick={() => {
                  setOutputData({
                    disbursementDate: new Date(
                      inputData.disbursementDate,
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }),
                    loanAmount: new Intl.NumberFormat("en-BD", {
                      style: "currency",
                      currency: "BDT",
                    }).format(Number(inputData.loanAmount)),
                    numberOfSchedule: inputData.numberOfMonths,
                    interestRate: `${inputData.interestRate} %`,
                    emiAmount: "26381.74",
                  });
                }}
                className="w-full"
              >
                Calculate EMI
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-tertiary-primay shadow-md">
          <CardHeader className="rounded-t-xl bg-tertiary-primay px-4 py-3">
            <CardTitle className="text-lg font-semibold text-white">
              EMI Breakdown (Output)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <p>Disbursement Date</p>
              <span className="text-right font-medium">
                {outputData.disbursementDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p>Loan Amount</p>
              <span className="text-right font-medium">
                {outputData.loanAmount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p>Schedule</p>
              <span className="text-right font-medium">
                {outputData.numberOfSchedule} months
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p>Interest Rate</p>
              <span className="text-right font-medium">
                {outputData.interestRate}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <p className="font-bold">EMI Amount</p>
              <p className="font-bold">BDT {outputData.emiAmount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

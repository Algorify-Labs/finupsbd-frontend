import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className=" max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">EMI Calculator</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Easily calculate your monthly loan installment based on the disbursement date, loan amount, interest rate, and loan period.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-primary">Loan Details (Input)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label htmlFor="disbursementDate">Disbursement Date</Label>
              <Input
                id="disbursementDate"
                type="date"
                value={inputData.disbursementDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="loanAmount">Loan Amount (BDT)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={inputData.loanAmount}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="numberOfMonths">Loan Term (Months)</Label>
              <Input
                id="numberOfMonths"
                type="number"
                value={inputData.numberOfMonths}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                value={inputData.interestRate}
                onChange={handleChange}
              />
            </div>
            <div className="pt-4">
              <Button
                onClick={() => {
                  setOutputData({
                    disbursementDate: new Date(
                      inputData.disbursementDate
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

        <Card className="bg-muted shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">EMI Breakdown (Output)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Disbursement Date</Label>
              <span className="text-right font-medium">
                {outputData.disbursementDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <Label>Loan Amount</Label>
              <span className="text-right font-medium">
                {outputData.loanAmount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <Label>Schedule</Label>
              <span className="text-right font-medium">
                {outputData.numberOfSchedule} months
              </span>
            </div>
            <div className="flex items-center justify-between">
              <Label>Interest Rate</Label>
              <span className="text-right font-medium">
                {outputData.interestRate}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <Label className="text-lg">EMI Amount</Label>
              <Badge className="text-lg px-3 py-1 rounded-xl">
                BDT {outputData.emiAmount}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

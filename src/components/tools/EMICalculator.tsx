"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emiCalculatorApi, EmiCalculatorPayload } from "@/services/public";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function EmiCalculator() {
  const [inputData, setInputData] = useState({
    disbursementDate: "",
    loanAmount: "150000",
    numberOfMonths: 12,
    interestRate: "11",
  });

  const [emiCalculator, setEmiCalculator] = useState<EmiCalculatorPayload>();
  const [loading, setLoading] = useState(false);

  const handelSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await emiCalculatorApi(inputData);
      setEmiCalculator(data);
    } catch (err) {
      // setError("Failed to load user profile")
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
                type="string"
                placeholder="Enter Loan Amount"
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
                type="string"
                placeholder="Enter Interest Rate"
                step="0.01"
                value={inputData.interestRate}
                onChange={handleChange}
              />
            </div>
            <div className="pt-2">
              <Button
                disabled={loading}
                onClick={() => handelSubmit()}
                className="w-full"
              >
                {loading ? "Loading..." : "Calculate EMI"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-tertiary-primary shadow-md">
          <CardHeader className="bg-tertiary-primary rounded-t-xl px-4 py-3">
            <CardTitle className="text-lg font-semibold text-white">
              EMI Breakdown (Output)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <p>Disbursement Date</p>
              <span className="text-right font-medium">
                {emiCalculator?.disbursementDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p>Loan Amount</p>
              <span className="text-right font-medium">
                {emiCalculator?.loanAmount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p>Schedule</p>
              <span className="text-right font-medium">
                {emiCalculator?.numberOfSchedule} Months
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p>Interest Rate</p>
              <span className="text-right font-medium">
                {emiCalculator?.interestRate}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <p className="font-bold">EMI Amount</p>
              <p className="font-bold">BDT {emiCalculator?.emiAmount}</p>
            </div>
            <div>
              {emiCalculator?.emiAmount && (
                <CardContent className="p-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Loan Amount",
                            value: Number(inputData.loanAmount),
                          },
                          {
                            name: "Total Interest",
                            value: Math.round(
                              Number(emiCalculator.emiAmount) *
                                inputData.numberOfMonths -
                                Number(inputData.loanAmount),
                            ),
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        <Cell fill="#4caf50" />
                        <Cell fill="#f44336" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatBDT } from "@/utils";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { TEligiblityCheckDataShow } from "../EligiblityTypes";

type PageProps = {
  submissionData: TEligiblityCheckDataShow;
  onSendData: (data: any) => void;
};

function EligiblityInstantLoanDataShow({
  submissionData,
  onSendData,
}: PageProps) {
  const { data: eligiblityData, pagination } = submissionData;
  const [amount, setAmount] = useState(
    eligiblityData[0]?.amount ? eligiblityData[0].eligibleLoan : 50000,
  );
  const [showConfetti, setShowConfetti] = useState(true);
  const [tenure, setTenure] = useState(1);

  useEffect(() => {
    const queryData = {
      amount,
      tenure,
    };

    onSendData(queryData);
  }, [amount, tenure]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-100">
              <div className="absolute h-full w-full rounded-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-1 w-1 bg-green-500"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 45}deg) translate(24px, 0px) translate(-50%, -50%)`,
                    }}
                  />
                ))}
              </div>
              <div className="z-10 rounded-full bg-green-600 p-2">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Congratulations Message */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold">
            Congratulations! You're Eligible for an Instant Loan
          </h1>
          <p className="text-gray-600">
            Based on your details, you qualify for our instant loan service!
            Complete your application and get funds within hours.
          </p>
        </div>

        {/* Sliders Section */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">Expected Amount</span>
              <span className="text-sm font-medium">
                BDT {amount.toLocaleString()}
              </span>
            </div>
            {/* <Slider
              defaultValue={[amount]}
              max={50000}
              step={10}
              onValueChange={(value) => setAmount(value[0])}
              className="mb-2"
            /> */}
            <Input
              type="text"
              value={`BDT ${amount.toLocaleString()}`}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value) setAmount(Number.parseInt(value));
              }}
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">Tenure (in Months)</span>
              <span className="text-sm font-medium">{tenure} Months</span>
            </div>
            <Slider
              defaultValue={[tenure]}
              min={1}
              max={3}
              step={1}
              onValueChange={(value) => setTenure(value[0])}
              className="mb-2"
            />
            <Input
              type="text"
              value={tenure}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                if (value) setTenure(Number.parseInt(value));
              }}
            />
          </div>
        </div>

        {eligiblityData.map((data) => (
          <>
            {/* Loan Details */}
            <div key={data.bankName} className="mb-8 rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div>
                    <Image
                      src={data?.coverImage}
                      alt={`${data.bankName} Logo`}
                      width={100}
                      height={100}
                      className="mr-3 rounded-xl"
                      priority
                    />
                  </div>
                  <h2 className="text-lg font-bold">{data.bankName}</h2>
                </div>
                <div className="flex items-center rounded-lg bg-green-600 px-4 py-2 text-white">
                  <span className="mr-1">Apply Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-600">Amount:</p>
                  <p className="font-medium">BDT {formatBDT(data.amount)}/-</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interest Rate:</p>
                  <p className="font-medium">{data.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Period (Months):</p>
                  <p className="font-medium">{data.periodMonths} Months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly EMI:</p>
                  <p className="font-medium">
                    BDT {formatBDT(data.monthlyEMI)}/-
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Processing Fee:</p>
                  <p className="font-medium">{data.processingFee}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Payment:</p>
                  <p className="font-medium">
                    BDT {formatBDT(data.totalRepayment)}/-
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-green-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-green-500">
                    Eligible Loan
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    BDT {formatBDT(data.eligibleLoan)}/-
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-6">
              <div className="mb-2 bg-green-50 p-2 font-bold text-green-600">
                Features:
              </div>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>
                  <strong>Loan Amount: </strong>
                  {data?.features?.loanAmount}
                </li>
                {/* <li><strong> Minimum: BDT {formatBDT(50000)}/- - Maximum: BDT {formatBDT(2000000)}/-</strong> </li> */}
                <li>
                  <strong>Loan Tenure: </strong>
                  {data?.features?.loanTenure}
                </li>
                <li>
                  <strong>
                    Minimum {data?.features?.minimumYear} Month - Maximum{" "}
                    {data?.features?.maximumYear} Month
                  </strong>
                </li>
              </ul>
            </div>

            {/* Eligibility Section */}
            <div className="mb-6">
              <div className="mb-2 bg-green-50 p-2 font-bold text-green-600">
                Eligibility Criteria:
              </div>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>{data?.eligibility?.condition}.</li>
                <li>
                  <strong>Offer: </strong>
                  {data?.eligibility?.offer}.
                </li>
                <li>
                  {" "}
                  <strong>Minimum Income:</strong> BDT{" "}
                  {formatBDT(data?.eligibility?.minimumIncome)}/-
                </li>
                <li>
                  <strong>Minimum Experience:</strong>{" "}
                  {data?.eligibility?.minimumExperience} years
                </li>
                <li>
                  <strong>Age Requirement:</strong> Minimum{" "}
                  {data?.eligibility?.ageRequirement} years to Maximum 65 yeears
                </li>
              </ul>
            </div>

            {/* Fees & Charges Section */}
            <div>
              <div className="mb-2 bg-green-50 p-2 font-bold text-green-600">
                Fees & Charges:
              </div>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>
                  <strong>Processing Fee:</strong>{" "}
                  {data?.feesCharges?.processingFee}.
                </li>
                <li>
                  <strong>Early Settlement Fee:</strong>
                  {data?.feesCharges?.earlySettlementFee}.
                </li>
                <li>
                  <strong>Prepayment Fee:</strong>{" "}
                  {data?.feesCharges?.prepaymentFee}
                </li>
                <li>
                  <strong>Loan Re-scheduling Fee:</strong>{" "}
                  {data?.feesCharges?.LoanReSchedulingFee}{" "}
                </li>
                <li>
                  <strong>Penal Charge:</strong>{" "}
                  {data?.feesCharges?.penalCharge}
                </li>
              </ul>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default EligiblityInstantLoanDataShow;

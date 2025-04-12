"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import Image from "next/image";

// Import shadcn/ui components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formDataSchema } from "./personalLoneValidation";
import { personalLoan } from "@/services/superAdmin/loans/personalLoan";

// Zod Schemas for nested objects
type FormData = z.infer<typeof formDataSchema>;

const defaultValues: FormData = {
  bankName: "City Bank PLC, Personal Loan",
  amount: "100000",
  periodMonths: "0",
  processingFee: "0.50",
  interestRate: "10",
  monthlyEmi: "0",
  totalAmount: "0",
  eligibleLoan: "0",
  features: {
    loanAmount: "BDT 2 lacs up to BDT 20 lacs",
    minimumAmount: "200000",
    maximumAmount: "2000000",
    loanTenure: "12 to 60 months",
    minimumYear: "1",
    maximumYear: "5",
  },
  eligibility: {
    condition:
      "Must meet City Bank's eligibility criteria including a good credit score and appropriate employment/experience requirements",
    offer: "Standard offer",
    minimumIncome: 40000,
    minimumExperience: 2,
    ageRequirement: 22,
  },
  feesCharges: {
    processingFee:
      "0.50% of loan amount | on take over amount 0% | on additional take over amount 0.50%",
    earlySettlementFee: "0.50% of the outstanding amount",
    prepaymentFee: "N/A",
    LoanReSchedulingFee:
      "0.25% on outstianding amount or Tk. 10,000 whichever is lower",
    penalCharge: "1.50% on the arrear amount",
  },
  image: undefined as unknown as FileList,
};

const PersonalLoanForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const formDataToSend = new FormData();
    try {
      if (data.image && data.image.length > 0) {
        formDataToSend.append("file", data.image[0]);
      }
      const { image, ...otherData } = data;
      formDataToSend.append("data", JSON.stringify(otherData));

      const res = await personalLoan(formDataToSend);
      console.log("API response:", res);
      toast.success("Personal loan added successfully");
      reset(defaultValues);
      setImagePreview(null);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(
        error?.response?.data?.message ||
        "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-6 text-center">
          Personal Loan input From
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Details Section */}
          <section className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Main Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" type="text" {...register("bankName")} />
                {errors.bankName && (
                  <p className="text-red-500 text-sm">
                    {errors.bankName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="processingFee">Processing Fee</Label>
                <Input
                  id="processingFee"
                  type="number"
                  step="0.1"
                  {...register("processingFee")}
                />
                {errors.processingFee && (
                  <p className="text-red-500 text-sm">
                    {errors.processingFee.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="interestRate">Interest Rate</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  {...register("interestRate")}
                />
                {errors.interestRate && (
                  <p className="text-red-500 text-sm">
                    {errors.interestRate.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="text"
                  {...register("features.loanAmount")}
                />
                {errors.features?.loanAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.features.loanAmount.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="minimumAmount">Minimum Amount</Label>
                <Input
                  id="minimumAmount"
                  type="number"
                  {...register("features.minimumAmount")}
                />
                {errors.features?.minimumAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.features.minimumAmount.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="maximumAmount">Maximum Amount</Label>
                <Input
                  id="maximumAmount"
                  type="number"
                  {...register("features.maximumAmount")}
                />
                {errors.features?.maximumAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.features.maximumAmount.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="loanTenure">Loan Tenure</Label>
                <Input
                  id="loanTenure"
                  type="text"
                  {...register("features.loanTenure")}
                />
                {errors.features?.loanTenure && (
                  <p className="text-red-500 text-sm">
                    {errors.features.loanTenure.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="minimumYear">Minimum Year</Label>
                <Input
                  id="minimumYear"
                  type="number"
                  {...register("features.minimumYear")}
                />
                {errors.features?.minimumYear && (
                  <p className="text-red-500 text-sm">
                    {errors.features.minimumYear.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="maximumYear">Maximum Year</Label>
                <Input
                  id="maximumYear"
                  type="number"
                  {...register("features.maximumYear")}
                />
                {errors.features?.maximumYear && (
                  <p className="text-red-500 text-sm">
                    {errors.features.maximumYear.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Eligibility Section */}
          <section className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Eligibility</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Input
                  id="condition"
                  type="text"
                  {...register("eligibility.condition")}
                />
                {errors.eligibility?.condition && (
                  <p className="text-red-500 text-sm">
                    {errors.eligibility.condition.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="offer">Offer</Label>
                <Input
                  id="offer"
                  type="text"
                  {...register("eligibility.offer")}
                />
                {errors.eligibility?.offer && (
                  <p className="text-red-500 text-sm">
                    {errors.eligibility.offer.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="minimumIncome">Minimum Income</Label>
                <Input
                  id="minimumIncome"
                  type="number"
                  {...register("eligibility.minimumIncome")}
                />
                {errors.eligibility?.minimumIncome && (
                  <p className="text-red-500 text-sm">
                    {errors.eligibility.minimumIncome.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="minimumExperience">
                  Minimum Experience (Years)
                </Label>
                <Input
                  id="minimumExperience"
                  type="number"
                  {...register("eligibility.minimumExperience")}
                />
                {errors.eligibility?.minimumExperience && (
                  <p className="text-red-500 text-sm">
                    {errors.eligibility.minimumExperience.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="ageRequirement">Age Requirement</Label>
                <Input
                  id="ageRequirement"
                  type="number"
                  {...register("eligibility.ageRequirement")}
                />
                {errors.eligibility?.ageRequirement && (
                  <p className="text-red-500 text-sm">
                    {errors.eligibility.ageRequirement.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Fees & Charges Section */}
          <section className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Fees & Charges</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fcProcessingFee">Processing Fee</Label>
                <Input
                  id="fcProcessingFee"
                  type="text"
                  {...register("feesCharges.processingFee")}
                />
                {errors.feesCharges?.processingFee && (
                  <p className="text-red-500 text-sm">
                    {errors.feesCharges.processingFee.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="earlySettlementFee">
                  Early Settlement Fee
                </Label>
                <Input
                  id="earlySettlementFee"
                  type="text"
                  {...register("feesCharges.earlySettlementFee")}
                />
                {errors.feesCharges?.earlySettlementFee && (
                  <p className="text-red-500 text-sm">
                    {errors.feesCharges.earlySettlementFee.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="prepaymentFee">Prepayment Fee</Label>
                <Input
                  id="prepaymentFee"
                  type="text"
                  {...register("feesCharges.prepaymentFee")}
                />
                {errors.feesCharges?.prepaymentFee && (
                  <p className="text-red-500 text-sm">
                    {errors.feesCharges.prepaymentFee.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="loanReschedulingFee">
                  Loan Rescheduling Fee
                </Label>
                <Input
                  id="loanReschedulingFee"
                  type="text"
                  {...register("feesCharges.LoanReSchedulingFee")}
                />
                {errors.feesCharges?.LoanReSchedulingFee && (
                  <p className="text-red-500 text-sm">
                    {errors.feesCharges.LoanReSchedulingFee.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="penalCharge">Penal Charge</Label>
                <Input
                  id="penalCharge"
                  type="text"
                  {...register("feesCharges.penalCharge")}
                />
                {errors.feesCharges?.penalCharge && (
                  <p className="text-red-500 text-sm">
                    {errors.feesCharges.penalCharge.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Image Upload Section */}
          <section className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upload Bank image Related personal loan</h2>
            <Input
              type="file"
              accept="image/*"
              {...register("image", { onChange: handleImageChange })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">
                {errors.image.message as string}
              </p>
            )}
            {imagePreview && (
              <div className="mt-4">
                <Image
                  height={150}
                  width={150}
                  src={imagePreview}
                  alt="Image Preview"
                  className="max-w-xs"
                />
              </div>
            )}
          </section>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalLoanForm;

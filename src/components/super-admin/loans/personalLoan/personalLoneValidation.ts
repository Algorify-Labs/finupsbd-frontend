import { z } from "zod";

export const featuresSchema = z.object({
    loanAmount: z.string().nonempty("Loan amount is required"),
    minimumAmount: z.string().nonempty("Minimum amount is required"),
    maximumAmount: z.string().nonempty("Maximum amount is required"),
    loanTenure: z.string().nonempty("Loan tenure is required"),
    minimumYear: z.string().nonempty("Minimum year is required"),
    maximumYear: z.string().nonempty("Maximum year is required"),
});

export const eligibilitySchema = z.object({
    condition: z.string().nonempty("Condition is required"),
    offer: z.string().nonempty("Offer is required"),
    minimumIncome: z.preprocess(
        (a) => parseFloat(a as string),
        z.number({ invalid_type_error: "Minimum income must be a number" })
    ),
    minimumExperience: z.preprocess(
        (a) => parseFloat(a as string),
        z.number({ invalid_type_error: "Minimum experience must be a number" })
    ),
    ageRequirement: z.preprocess(
        (a) => parseFloat(a as string),
        z.number({ invalid_type_error: "Age requirement must be a number" })
    ),
});

export const feesChargesSchema = z.object({
    processingFee: z.string().nonempty("Processing fee is required"),
    earlySettlementFee: z.string().nonempty("Early settlement fee is required"),
    prepaymentFee: z.string().nonempty("Prepayment fee is required"),
    LoanReSchedulingFee: z.string().nonempty("Loan rescheduling fee is required"),
    penalCharge: z.string().nonempty("Penal charge is required"),
});

export const formDataSchema = z.object({
    bankName: z.string().nonempty("Bank name is required"),
    amount: z.string().nonempty("Amount is required"),
    periodMonths: z.string().nonempty("Period is required"),
    processingFee: z.string().nonempty("Processing fee is required"),
    interestRate: z.string().nonempty("Interest rate is required"),
    monthlyEmi: z.string().nonempty("Monthly EMI is required"),
    totalAmount: z.string().nonempty("Total amount is required"),
    eligibleLoan: z.string().nonempty("Eligible loan is required"),
    features: featuresSchema,
    eligibility: eligibilitySchema,
    feesCharges: feesChargesSchema,
    image: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, { message: "Image is required" }),
});
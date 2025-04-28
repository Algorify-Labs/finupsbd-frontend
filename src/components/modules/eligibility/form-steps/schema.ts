import { calculateAge } from "@/utils";
import { z } from "zod";

// Step One Schema
export const stepOneSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine(
      (dob) => {
        const age = calculateAge(dob);
        return age >= 22 && age <= 65;
      },
      { message: "Your age must be between 22 and 65 years old." },
    ),
  ),
  profession: z.string().min(1, "Profession is required"),
  jobLocation: z.string().min(1, "Location is required"),
  monthlyIncome: z
    .number({
      required_error: "Monthly Income (BDT) is required",
      invalid_type_error: "Monthly Income must be a number",
    })
    .int({ message: "Monthly income must be an integer" })
    .min(30000, { message: "Monthly income must be at least 30,000/- BDT" })
    .max(1000000000, {
      message: "Monthly income must not exceed 1,000,000,000/- BDT",
    }),
  businessOwnerType: z.string().optional(),
  businessType: z.string().optional(),
  sharePortion: z.number().optional(),
  tradeLicenseAge: z.number().optional(),
  expectedLoanTenure: z.number().min(1, "Expected Loan Tenure is required"),
});

// Step Two Schema
export const stepTwoSchema = z.object({
  hasLoan: z.enum(["YES", "NO"], {
    required_error: "Please select if you have loans",
  }),
  numberOfLoans: z.number().optional(),
  loans: z
    .array(
      z.object({
        loanType: z.string().nonempty("Loan type is required"),
        loanAmount: z.number().min(1000, "Minimum loan amount is 1000"),
      }),
    )
    .optional(),
});

// Step Two Schema
export const stepThreeSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

// Combine manually in a new schema
export const fullFormSchema = z
  .object({
    ...stepOneSchema.shape,
    ...stepTwoSchema.shape,
    ...stepThreeSchema.shape,
  })
  .superRefine((data, ctx) => {
    // your conditional logic for business owner
    if (
      data.profession === "BUSINESS_OWNER" ||
      data.profession === "SELF_EMPLOYED"
    ) {
      if (!data.businessOwnerType || data.businessOwnerType.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["businessOwnerType"],
          message: "Business Owner Type is required",
        });
      }
      if (!data.businessType || data.businessType.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["businessType"],
          message: "Business Type is required",
        });
      }
      if (typeof data.sharePortion !== "number") {
        ctx.addIssue({
          code: "custom",
          path: ["sharePortion"],
          message: "Share Portion is required",
        });
      } else if (data.sharePortion < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["sharePortion"],
          message: "Share Portion must be at least 1%",
        });
      }
      if (typeof data.tradeLicenseAge !== "number") {
        ctx.addIssue({
          code: "custom",
          path: ["tradeLicenseAge"],
          message: "Trade License Age is required",
        });
      } else if (data.tradeLicenseAge < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["tradeLicenseAge"],
          message: "Trade License Age must be at least 1 year",
        });
      }
    }

    if (data.hasLoan === "YES") {
      if (
        typeof data.numberOfLoans !== "number" ||
        data.numberOfLoans < 1 ||
        data.numberOfLoans > 3
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["numberOfLoans"],
          message: "Please select number of loans (1, 2 or 3)",
        });
      }
      if (!data.loans || data.loans.length !== data.numberOfLoans) {
        ctx.addIssue({
          code: "custom",
          path: ["loans"],
          message: "Loan details are required for each loan",
        });
      } else {
        data.loans.forEach((loan, index) => {
          if (!loan.loanType) {
            ctx.addIssue({
              code: "custom",
              path: ["loans", index, "loanType"],
              message: `Loan type required for loan ${index + 1}`,
            });
          }
          if (!loan.loanAmount || loan.loanAmount < 1000) {
            ctx.addIssue({
              code: "custom",
              path: ["loans", index, "loanAmount"],
              message: `Loan amount must be at least 1000 for loan ${index + 1}`,
            });
          }
        });
      }
    }
  });

export type FullFormSchema = z.infer<typeof fullFormSchema>;

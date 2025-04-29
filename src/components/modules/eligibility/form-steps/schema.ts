import { calculateAge } from "@/utils";
import { z } from "zod";

const dateValidation = z.date().refine(
  (dob) => {
    const age = calculateAge(dob);
    return age >= 22 && age <= 65;
  },
  { message: "Your age must be between 22 and 65 years old." },
);

// Step One Schema
export const stepOneSchema = z
  .object({
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
    expectedLoanTenure: z.number({
      required_error: "Expected Loan Tenure is required",
      invalid_type_error: "Expected Loan Tenure is required",
    }),
  })
  .superRefine((data, ctx) => {
    console.log("SuperRefine running, profession:", data.profession);
    if (["BUSINESS_OWNER", "SELF_EMPLOYED"].includes(data.profession)) {
      if (!data.businessOwnerType?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Business Owner Type is required",
          path: ["businessOwnerType"],
        });
      }
      if (!data.businessType?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Business Type is required",
          path: ["businessType"],
        });
      }
      if (data.sharePortion === undefined || data.sharePortion === null) {
        ctx.addIssue({
          code: "custom",
          message: "Share Portion is required",
          path: ["sharePortion"],
        });
      }
      if (data.tradeLicenseAge === undefined || data.tradeLicenseAge === null) {
        ctx.addIssue({
          code: "custom",
          message: "Trade License Age is required",
          path: ["tradeLicenseAge"],
        });
      }
    }
  });

// Step Two Schema
export const stepTwoSchema = z.object({
  haveAnyLoan: z.union([
    z.string({
      required_error: "Please select if you have any loan",
      invalid_type_error: "Please select if you have any loan",
    }),
    z.boolean(),
  ]),
  numberOfLoans: z.number().optional(),
  existingLoans: z
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
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

// Combine manually in a new schema
export const fullFormSchema = z
  .object({
    ...stepOneSchema._def.schema.shape,
    ...stepTwoSchema.shape,
    ...stepThreeSchema.shape,
  })
  .superRefine((data, ctx) => {
    console.log("SuperRefine running, profession:", data.profession);
    if (["BUSINESS_OWNER", "SELF_EMPLOYED"].includes(data.profession)) {
      if (!data.businessOwnerType?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Business Owner Type is required",
          path: ["businessOwnerType"],
        });
      }
      if (!data.businessType?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Business Type is required",
          path: ["businessType"],
        });
      }
      if (data.sharePortion === undefined || data.sharePortion === null) {
        ctx.addIssue({
          code: "custom",
          message: "Share Portion is required",
          path: ["sharePortion"],
        });
      }
      if (data.tradeLicenseAge === undefined || data.tradeLicenseAge === null) {
        ctx.addIssue({
          code: "custom",
          message: "Trade License Age is required",
          path: ["tradeLicenseAge"],
        });
      }
    }

    if (data.haveAnyLoan === "YES") {
      if (
        typeof data.numberOfLoans !== "number" ||
        data.numberOfLoans < 1 ||
        data.numberOfLoans > 3
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["numberOfLoans"],
          message: "Please select number of loans you have",
        });
      }
      if (
        !data.existingLoans ||
        data.existingLoans.length !== data.numberOfLoans
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["loans"],
          message: "Loan details are required for each loan",
        });
      } else {
        data.existingLoans.forEach((loan, index) => {
          if (!loan.loanType) {
            ctx.addIssue({
              code: "custom",
              path: ["existingLoans", index, "loanType"],
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

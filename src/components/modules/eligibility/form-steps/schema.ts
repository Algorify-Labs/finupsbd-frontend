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
  haveAnyCreditCard: z.union([
    z.string({
      required_error: "Please select if you have any credit card",
      invalid_type_error: "Please select if you have any credit card",
    }),
    z.boolean(),
  ]),
  numberOfCreditCards: z.number().optional(),
  existingLoans: z
    .array(
      z.object({
        existingLoanType: z.string().nonempty("Loan type is required"),
        loanOutstanding: z
          .number({
            required_error: "Outstanding Amount is required",
            invalid_type_error: "Outstanding  Amount must be a number",
          })
          .int({ message: "Outstanding Amount must be an integer" })
          .min(1000, "Outstanding Amount must be at least 1000 BDT"),
        emiAmount: z
          .number({
            required_error: "EMI Amount is required",
            invalid_type_error: "EMI Amount must be a number",
          })
          .int({ message: "EMI Amount must be an integer" })
          .min(1, "EMI Amount must be at least 1000 BDT"),
        interestRate: z.preprocess(
          (val) => (typeof val === "string" ? Number(val) : val),
          z
            .number({
              required_error: "Interest rate is required",
              invalid_type_error: "Interest rate must be a number",
            })
            .min(0, "Interest rate must be at least 0%")
            .max(100, "Interest rate must not exceed 100%"),
        ),
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
        data.numberOfLoans > 5
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["numberOfLoans"],
          message: "Please select number of loans",
        });
      }
      if (
        !data.existingLoans ||
        data.existingLoans.length !== data.numberOfLoans
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["esistingLoans"],
          message: "Loan details are required for each loan",
        });
      } else {
        data.existingLoans.forEach((loan, index) => {
          if (!loan.existingLoanType) {
            ctx.addIssue({
              code: "custom",
              path: ["existingLoans", index, "existingLoanType"],
              message: `Loan type required for loan ${index + 1}`,
            });
          }
          if (!loan.loanOutstanding || loan.loanOutstanding < 1000) {
            ctx.addIssue({
              code: "custom",
              path: ["existingLoans", index, "loanOutstanding"],
              message: `Amount must be at least 1000 BDT ${index + 1}`,
            });
          }
          if (!loan.emiAmount || loan.emiAmount < 1000) {
            ctx.addIssue({
              code: "custom",
              path: ["existingLoans", index, "emiAmount"],
              message: `Amount must be at least 1000 BDT ${index + 1}`,
            });
          }
          if (!loan.interestRate) {
            ctx.addIssue({
              code: "custom",
              path: ["existingLoans", index, "interestRate"],
              message: `Interest rate is required`,
            });
          }
        });
      }
    }

    if (data.haveAnyCreditCard === "YES") {
      if (
        typeof data.numberOfCreditCards !== "number" ||
        data.numberOfCreditCards < 1 ||
        data.numberOfCreditCards > 5
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["numberOfCreditCards"],
          message: "Please select number of cards",
        });
      }
    }
  });

export type FullFormSchema = z.infer<typeof fullFormSchema>;

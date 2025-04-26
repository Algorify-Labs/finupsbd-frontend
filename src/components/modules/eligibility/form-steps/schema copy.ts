import { calculateAge } from "@/utils";
import { z } from "zod";

// Step Two Schema
const ageVerification = z.date().refine(
  (dob) => {
    const age = calculateAge(dob);
    return age >= 22 && age <= 65;
  },
  { message: "Your age must be between 22 and 65 years old." },
);

/*export const stepOneSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: ageVerification,
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

  businessOwnerType: z.string().min(1, "Business Owner Type is required"),
  businessType: z.string().min(1, "Business Type is required"),

  sharePortion: z
    .number({
      required_error: "Share Portion is required",
      invalid_type_error: "Share Portion must be a number",
    })
    .int({ message: "Share Portion must be an integer" })
    .min(1, "Share Portion must be at least 1%"),
  tradeLicenseAge: z
    .number({
      required_error: "Share Portion is required",
      invalid_type_error: "Share Portion must be a number",
    })
    .int({ message: "Share Portion must be an integer" })
    .min(1, "Share Portion must be at least 1%"),
  expectedLoanTenure: z.number().min(1, "Location is required"),
});*/

// Step One Schema
export const stepOneSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: ageVerification,
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
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

// Combine manually in a new schema
export const fullFormSchema = z
  .object({
    ...stepOneSchema.shape,
    ...stepTwoSchema.shape,
  })
  .superRefine((data, ctx) => {
    // your conditional logic for business owner
    if (data.profession === "BUSINESS_OWNER") {
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
  });

export type FullFormSchema = z.infer<typeof fullFormSchema>;

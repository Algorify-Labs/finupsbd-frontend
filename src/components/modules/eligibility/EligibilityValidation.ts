import { calculateAge } from "@/utils";
import { z } from "zod";

const EGenderSchema = z.enum(["MALE", "FEMALE", "OTHER"]);
const jobLocation = z.enum(["DHAKA"]);
const ProfessionSchema = z.enum(["BUSINESS_OWNER", "SALARIED"]);
const BusinessOwnerTypeSchema = z.enum([
  "PROPRIETOR",
  "PARTNER",
  "CORPORATION",
  "LLC",
  "COOPERATIVE",
  "JOINT_VENTURE",
  "FRANCHISE",
]);
const VehicleTypeSchema = z.enum([
  "CAR_SEDAN",
  "CAR_SUV",
  "CAR_HATCHBACK",
  "BIKE",
]);
const ExistingLoanTypeSchema = z.enum([
  "HOME_LOAN",
  "PERSONAL_LOAN",
  "CAR_LOAN",
  "SME_LOAN",
  "CREDIT_CARD",
  "OTHER",
]);
const CardTypeSchema = z.enum(["CREDIT_CARD"]);

// Base schema with optional fields for conditional validations

const dateValidation = z.date().refine(
  (dob) => {
    const age = calculateAge(dob);
    return age >= 22 && age <= 65;
  },
  { message: "Your age must be between 22 and 65 years old." },
);

const baseEligibilityCheckSchema = z.object({
  gender: EGenderSchema,
  dateOfBirth: dateValidation,
  profession: ProfessionSchema,

  // Business-related fields
  businessOwnerType: BusinessOwnerTypeSchema.optional(),
  businessType: z.string().optional(),
  sharePortion: z
    .number()
    .int({ message: "Share portion must be an integer." })
    .optional(),
  tradeLicenseAge: z
    .number()
    .int({ message: "Trade license age must be an integer." })
    .optional(),

  // Additional info
  vehicleType: VehicleTypeSchema.optional(),
  expectedLoanTenure: z
    .number({ message: "Expected Loan Tenure required" })
    .int({ message: "Expected loan tenure must be an integer." }),
  monthlyIncome: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z
      .number({
        required_error: "Monthly Income (BDT) is required",
        invalid_type_error: "Monthly Income must be a number",
      })
      .int({ message: "Monthly income must be an integer." })
      .min(30000, { message: "Your salary must be at least 30,000/- BDT" })
      .max(1000000000, {
        message: "Your salary must not exceed 1,000,000,000/- BDT",
      }),
  ),
  jobLocation: jobLocation,

  // Rental income
  haveAnyRentalIncome: z.boolean().optional(),
  selectArea: z.string().optional(),
  rentalIncome: z
    .preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z
        .number()
        .int({ message: "Rental Income must be an integer." })
        .min(100, { message: "Rental Income must be at least 100 BDT." })
        .max(100000000000, {
          message: "Rental Income must not exceed 1,000,000,000,000 BDT.",
        })
        .optional(),
    )
    .optional(),

  // Existing loan details
  haveAnyLoan: z.boolean().optional(),
  numberOfLoan: z.number().optional(),
  existingLoanType: ExistingLoanTypeSchema.optional(),
  EMIAmountBDT: z
    .preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z
        .number()
        .int({ message: "EMI amount must be an integer." })
        .min(100, { message: "EMI amount must be at least 100 BDT." })
        .max(1000000, { message: "EMI amount must not exceed 1,000,000 BDT." })
        .optional(),
    )
    .optional(),
  InterestRate: z
    .preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z
        .number({
          required_error: "Interest rate is required",
          invalid_type_error: "Interest rate must be a number",
        })
        .min(0, "Interest rate must be at least 0%")
        .max(100, "Interest rate must not exceed 100%"),
    )
    .optional(),
  loanOutstanding: z
    .number()
    .int({ message: "Loan Oustanding must be an integer." })
    .optional(),

  // Credit card details
  haveAnyCreditCard: z.boolean().optional(),
  numberOfCard: z.number().optional(),
  cardType: CardTypeSchema.optional(),
  cardLimitBDT: z
    .number()
    .int({ message: "Card limit must be an integer." })
    .optional(),

  // Secondary applicant and terms
  secondaryApplicant: z.boolean().optional(),
  termsAccepted: z.boolean().optional(),

  // Contact / personal info
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),

  // Loan application status
  isAppliedLoan: z.boolean({ message: "Must Selecets" })
});

// Extend the schema with conditional validations using superRefine
export const eligibilityCheckValidationSchema =
  baseEligibilityCheckSchema.superRefine((data, ctx) => {
    // Example: conditionally require business fields when profession is BUSINESS_OWNER.
    if (data.profession === "BUSINESS_OWNER") {
      if (!data.businessOwnerType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["businessOwnerType"],
          message: "Business owner type is required",
        });
      }
      if (!data.businessType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["businessType"],
          message: "Business type is required ",
        });
      }
      if (data.sharePortion === undefined || data.sharePortion === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sharePortion"],
          message: "Share portion is required ",
        });
      }
      if (data.tradeLicenseAge === undefined || data.tradeLicenseAge === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tradeLicenseAge"],
          message: "Trade license age is required ",
        });
      }
    }

    // Conditionally require rental income details if haveAnyRentalIncome is true
    if (data.haveAnyRentalIncome) {
      if (!data.selectArea) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["selectArea"],
          message: "selectArea is required",
        });
      }
      if (data.rentalIncome === undefined || data.rentalIncome === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["rentalIncome"],
          message: "Rental income is required ",
        });
      }
    }

    // Conditionally require loan details if haveAnyLoan is true
    if (data.haveAnyLoan) {
      if (data.numberOfLoan === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["numberOfLoan"],
          message: "Number of loan(s) is required ",
        });
      }
      if (!data.existingLoanType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["existingLoanType"],
          message: "Existing loan type is required",
        });
      }
      if (data.EMIAmountBDT === undefined || data.EMIAmountBDT === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["EMIAmountBDT"],
          message: "EMI amount is required when ",
        });
      }
    }

    // Conditionally require credit card details if haveAnyCreditCard is true
    if (data.haveAnyCreditCard) {
      if (data.numberOfCard === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["numberOfCard"],
          message: "Number of cards is required ",
        });
      }
      if (!data.cardType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cardType"],
          message: "Card type is required ",
        });
      }
    }

    if (
      typeof data.EMIAmountBDT === "number" &&
      typeof data.monthlyIncome === "number" &&
      data.EMIAmountBDT > data.monthlyIncome / 2
    ) {
      console.log(data.EMIAmountBDT);
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["EMIAmountBDT"],
        message: "EMI amount cannot exceed your monthly income",
      });
    }

    if (
      typeof data.numberOfCard === "number" &&
      typeof data.monthlyIncome === "number" &&
      data.numberOfCard * 2000 - data.monthlyIncome / 2 > data.monthlyIncome / 2
    ) {
      console.log(data.EMIAmountBDT);
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["EMIAmountBDT"],
        message: "Yor card limit cannot exceed your monthly income",
      });
    }
  });

export type EligibilityCheckData = z.infer<
  typeof eligibilityCheckValidationSchema
>;

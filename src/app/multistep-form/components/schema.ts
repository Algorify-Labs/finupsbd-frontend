import * as z from "zod";

export const stepOneSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export const stepTwoSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

export const fullFormSchema = stepOneSchema.merge(stepTwoSchema);

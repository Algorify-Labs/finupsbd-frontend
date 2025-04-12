import { z } from "zod";

// Define the schema within this file since there were import issues mentioned
export const userProfileSchema = z.object({
  nameAsNid: z.string().min(2, "Name must be at least 2 characters"),
  nationalIdNumber: z.string().min(10, "Please enter a valid National ID number"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Please select your gender",
  }),
  dateOfBirth: z.date({
    required_error: "Please select your date of birth",
  }),
  address: z.string().optional(),
  city: z.string({
    required_error: "Please select your city",
  }),
})

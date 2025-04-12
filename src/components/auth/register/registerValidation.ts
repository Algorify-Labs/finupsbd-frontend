
import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(11, {
    message: "Phone number must be valid.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data: any )=> data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
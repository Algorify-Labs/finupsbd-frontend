
import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  // phone: z.string().min(11, {
  //   message: "Phone number must be valid.",
  // }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),

})
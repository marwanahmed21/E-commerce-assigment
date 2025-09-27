
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid Email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be less than 20 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

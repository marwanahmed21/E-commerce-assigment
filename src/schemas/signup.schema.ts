
import { z } from "zod";

const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be less than 20 characters"),
  email: z.string().email("Invalid Email"),
  phone: z
    .string()
    .regex(phoneRegex, "Sorry, we only accept Egyptian phone numbers"),
  password: z
    .string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be less than 20 characters"),
  rePassword: z.string(),
}).refine((data) => data.password === data.rePassword, {
  message: "Password & Confirm password should be the same",
  path: ["rePassword"], 
});

export type SignUpValues = z.infer<typeof signUpSchema>;

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Define Zod schema
const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Must contain upper, lower, number & special character"
    ),
});

// 🔹 Infer TypeScript type from schema
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();

  // 🔹 Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // 🔹 Submit handler
  async function onSubmit(values: ResetPasswordFormValues) {
    const toastId = toast.loading("Waiting....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.token) {
        toast.success("User password updated successfully");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-[60vh]">
      <div className="flex flex-col justify-center items-center border rounded-md shadow-md bg-gray-200 w-1/2 p-6">
        <h2 className="font-semibold my-4">Reset Password</h2>

        <form
          className="w-3/4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div>
            <input
              className="form-control w-full"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                *{errors.email.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <input
              className="form-control w-full"
              type="password"
              placeholder="Enter your new password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                *{errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            className="btn bg-green-600 text-white py-2 px-4 rounded-md"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

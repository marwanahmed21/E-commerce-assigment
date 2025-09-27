"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Define Zod schema
const resetCodeSchema = z.object({
  resetCode: z
    .string()
    .min(6, "Reset code must be at least 6 characters")
    .max(6, "Reset code must be exactly 6 characters"),
});

// 🔹 Infer TS type from schema
type ResetCodeFormValues = z.infer<typeof resetCodeSchema>;

export default function ResetCode() {
  const router = useRouter();

  // 🔹 Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetCodeFormValues>({
    resolver: zodResolver(resetCodeSchema),
  });

  // 🔹 Submit handler
  async function onSubmit(values: ResetCodeFormValues) {
    const toastId = toast.loading("Waiting....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.status === "Success") {
        toast.success("Code verified successfully");
        setTimeout(() => {
          router.push("/resetPassword");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid reset code");
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-[60vh]">
      <div className="flex flex-col justify-center items-center border rounded-md shadow-md bg-gray-200 w-1/2 p-6">
        <h2 className="font-semibold my-4">Forgot Your Password</h2>

        <form
          className="w-3/4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Reset Code Input */}
          <div>
            <input
              className="form-control w-full"
              type="text"
              placeholder="Enter reset code"
              {...register("resetCode")}
            />
            {errors.resetCode && (
              <p className="text-red-500 text-sm mt-1">
                *{errors.resetCode.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
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

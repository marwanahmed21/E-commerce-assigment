"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    const toastId = toast.loading("Waiting ....");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        
        values
      );

      if (data.statusMsg === "success") {
        toast.success("Reset code sent successfully");
        setTimeout(() => {
          router.push("/resetCode");
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
      <div className="flex flex-col justify-center items-center border-solid rounded-md shadow-md bg-green-200 w-1/2 p-6">
        <h2 className="font-semibold my-4">Forgot Your Password</h2>

        <form
          className="w-3/4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="email">
            <input
              className="form-control w-full"
              type="email"
              placeholder="Enter Your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                *{errors.email.message}
              </p>
            )}
          </div>

          <button
            className="btn bg-green-600 text-white rounded-md py-2 px-4"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send code"}
          </button>
        </form>
      </div>
    </section>
  );
}

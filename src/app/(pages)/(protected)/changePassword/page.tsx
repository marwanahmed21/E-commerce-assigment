"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store.hook";
import { setToken } from "@/store/feature/user.slice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

// ✅ Zod schema
const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .regex(
        passwordRegex,
        "Minimum eight characters, at least one lower case letter, one number"
      ),
    password: z
      .string()
      .min(1, "New password is required")
      .regex(
        passwordRegex,
        "Minimum eight characters, at least one lower case letter, one number"
      ),
    rePassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password & Confirm password should be the same",
    path: ["rePassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken as string | undefined;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmit(values: ChangePasswordValues) {
    const toastId = toast.loading("Waiting...");
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token,
          },
        }
      );

      if (data.message === "success") {
        toast.success(
          "Your Password has been changed successfully, Try to sign in."
        );
        reset();
        setTimeout(() => {
          router.push("/login");
          dispatch(setToken(null));
        }, 1500);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-[60vh] px-4 md:px-0">
      <div className="flex flex-col justify-center items-center border-solid rounded-md shadow-md bg-gray-200 w-full md:w-1/2 ">
        <h2 className="font-semibold text-gray-600 my-4">
          Change Your Password
        </h2>

        <form
          className="w-3/4 flex justify-center flex-col space-y-4 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="current-password">
            <input
              className="form-control"
              type="password"
              placeholder="Current password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="new-password">
            <input
              className="form-control"
              type="password"
              placeholder="New password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="re-password">
            <input
              className="form-control"
              type="password"
              placeholder="Re-enter password"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-green-600 mb-4 cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

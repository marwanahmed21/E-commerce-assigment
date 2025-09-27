"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, type SignUpValues } from "@/schemas/signup.schema";

export default function SignUp() {
  const router = useRouter();
  const [accountError, setAccountError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: SignUpValues) => {
    const loadingId = toast.loading("Waiting...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message === "success") {
        toast.success("User created successfully");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
        setAccountError(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return (
    <>
      <h2 className="my-5 text-center md:text-start">Register Now :</h2>
      <form
        className="space-y-6 mx-auto w-3/4 md:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div className="name">
          <input
            className="w-full form-control"
            type="text"
            placeholder="Enter Your Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-400 mt-1 text-sm">*{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="email">
          <input
            className="w-full form-control"
            type="email"
            placeholder="Enter Your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 mt-1 text-sm">*{errors.email.message}</p>
          )}
          {accountError && (
            <p className="text-red-400 mt-1 text-sm">*{accountError}</p>
          )}
        </div>

        {/* Phone */}
        <div className="phone">
          <input
            className="w-full form-control"
            type="tel"
            placeholder="Enter Your mobile number"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-400 mt-1 text-sm">*{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="password">
          <input
            className="w-full form-control"
            type="password"
            placeholder="Enter Your Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400 mt-1 text-sm">
              *{errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="rePassword">
          <input
            className="w-full form-control"
            type="password"
            placeholder="Confirm your Password"
            {...register("rePassword")}
          />
          {errors.rePassword && (
            <p className="text-red-400 mt-1 text-sm">
              *{errors.rePassword.message}
            </p>
          )}
        </div>

        <button
          className="flex ml-auto py-2 px-3 bg-blue-400 text-white rounded-md"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </>
  );
}

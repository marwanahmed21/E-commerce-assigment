"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginValues } from "@/schemas/login.schema";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-3/4 mx-auto">
      <h2 className="my-5 text-center md:text-start">Sign In Now :</h2>
      <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="email">
          <input
            className="form-control"
            type="email"
            placeholder="Enter Your Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 mt-1 text-sm">*{errors.email.message}</p>
          )}
        </div>

        <div className="password">
          <input
            className="form-control"
            type="password"
            placeholder="Enter Your Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400 mt-1 text-sm">*{errors.password.message}</p>
          )}
          {error && <p className="text-red-400 mt-1 text-sm">*{error}</p>}
        </div>

        <Link
          className="inline-block mt-3 text-blue-500 hover:text-blue-600"
          href={"/forgotPassword"}
        >
          Forgot your password?
        </Link>

        <button
          className="flex ml-auto py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white rounded-md cursor-pointer"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

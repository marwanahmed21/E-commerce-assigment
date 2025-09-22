"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { login } from "@/store/feature/user.slice";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { object, string } from "yup";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector((state) => state.userReducer.err);


  const schema = object({
    email: string().required("Email is required").email("Invalid Email"),

    password: string()
      .required("Password is required").min(8,'Must be atleast 8 character').max(20,'Must be less than 20 character'),
      
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values))
        .then((res) => {
          if (res.payload.message === "success") {
            setTimeout(() => {
              router.push("/");
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <>
      <div className="w-3/4 mx-auto">
        <h2 className="my-5 text-center md:text-start">Sign In Now :</h2>
        <form className="space-y-3 w-full" onSubmit={formik.handleSubmit}>
          <div className="email ">
            <input
              className=" form-control "
              type="email"
              placeholder="Enter Your email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-400 mt-1 text-sm">
                *{formik.errors.email}
              </p>
            )}
          </div>

          <div className="password">
            <input
              className=" form-control"
              type="password"
              placeholder="Enter Your Password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-400 mt-1 text-sm">
                *{formik.errors.password}
              </p>
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
    </>
  );
}

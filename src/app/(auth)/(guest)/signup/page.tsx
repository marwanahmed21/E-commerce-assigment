'use client'
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { object, ref, string } from "yup";


interface SignUpFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
}

export default function SignUp() {
  const router = useRouter();
  const [accountError, setAccountError] = useState(null);

  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  const schema = object({
    name: string()
      .required("Name is required")
      .min(3, "Must be atleast 3 character")
      .max(20, "Must be less than 20 character"),
    email: string().required("Email is required").email("Invalid Email"),
    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "sorry, we only accept Egyptian phone number"),
    password: string()
      .required("Password is required").min(8,'Must be atleast 8 character').max(20,'Must be less than 20 character'),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf(
        [ref("password")],
        "Password & Confirm password should be the same"
      ),
  });

  async function handleSubmit(values:SignUpFormValues) {
    const loadingId = toast.loading("Waiting");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("User created successfully");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
  if (axios.isAxiosError(error) && error.response) {
    toast.error(error.response.data.message);
    setAccountError(error.response.data.message);
  } else {
    toast.error("Something went wrong");
  }} finally {
      toast.dismiss(loadingId);
    }
  }
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <h2 className="my-5 text-center md:text-start">Register Now :</h2>
      <form className="space-y-6 mx-auto w-3/4 md:w-full" onSubmit={formik.handleSubmit}>
        <div className="name">
          <input
            className="w-full form-control"
            type="text"
            placeholder="Enter Your Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-400 mt-1 text-sm">*{formik.errors.name}</p>
          )}
        </div>
        <div className="email">
          <input
            className="w-full form-control"
            type="email"
            placeholder="Enter Your email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-400 mt-1 text-sm">*{formik.errors.email}</p>
          )}
          {accountError && (
            <p className="text-red-400 mt-1 text-sm">*{accountError}</p>
          )}
        </div>
        <div className="phone">
          <input
            className="w-full form-control"
            type="tel"
            placeholder="Enter Your mobile number"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-400 mt-1 text-sm">*{formik.errors.phone}</p>
          )}
        </div>
        <div className="password">
          <input
            className="w-full form-control"
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
        </div>
        <div className="rePassword">
          <input
            className="w-full form-control"
            type="password"
            placeholder="Enter Your repassword"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-400 mt-1 text-sm">
              *{formik.errors.rePassword}
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

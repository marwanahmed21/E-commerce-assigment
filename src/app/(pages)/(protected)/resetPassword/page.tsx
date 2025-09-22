"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { object, string } from "yup";

interface UpdatePasswordValues {
  email: string;
  newPassword: string;
}

export default function ResetPassword() {
  const router = useRouter();

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const schema = object({
    email: string().required("Email is required").email("Invalid Email"),

    newPassword: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English constter, one lower case English constter, one number and one special character"
      ),
  });

  async function handleSubmit(values: UpdatePasswordValues) {
    const toastId = toast.loading("Waiting....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.token) {
        toast.success("User Password Update successfully");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  const formik = useFormik<UpdatePasswordValues>({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="flex flex-col justify-center items-center border-solid rounded-md shadow-md bg-gray-200 w-1/2">
          <h2 className="font-semibold my-4">Reset Password</h2>
          <form
            className="w-3/4 flex justify-center flex-col"
            onSubmit={formik.handleSubmit}
          >
            <div className="email mb-4">
              <input
                className="form-control"
                type="email"
                placeholder="Enter Your email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="newPassword mb-4">
              <input
                className="form-control"
                type="password"
                placeholder="Enter Your new Password"
                name="newPassword"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
              />
            </div>
            {formik.errors.newPassword && (
              <p className="text-red-400 mt-1 text-sm">
                *{formik.errors.newPassword}
              </p>
            )}
            <button className="btn bg-green-600  mb-4 " type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

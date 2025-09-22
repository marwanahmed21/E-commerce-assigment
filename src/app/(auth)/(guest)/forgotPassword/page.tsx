'use client'
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { object, string } from "yup";
interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const schema = object({
    email: string().required("Email is required").email("Invalid Email"),
  });

  async function handleSubmit(values:ForgotPasswordFormValues) {
    const toastId = toast.loading("Waiting ....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.statusMsg === "success") {
        toast.success("reset code sent successfully");
        setTimeout(() => {
          router.push("/resetCode");
        }, 2000);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="flex flex-col justify-center items-center border-solid rounded-md shadow-md bg-green-200 w-1/2">
          <h2 className="font-semibold my-4">Forgot Your Password</h2>
          <form
            className="w-3/4 flex justify-center flex-col"
            onSubmit={formik.handleSubmit}
          >
            <div className="email mb-4">
              <input
                className="form-control"
                type="email"
                placeholder="Enter Your email"
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email}
              />
            </div>
            <button className="btn bg-green-600  mb-4 " type="submit">
              Send code
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

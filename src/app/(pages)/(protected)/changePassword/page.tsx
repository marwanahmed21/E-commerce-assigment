'use client'
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { setToken } from "@/store/feature/user.slice";



interface ChangePasswordValues {
    currentPassword: string,
      password: string,
      rePassword: string,
}

export default function ChangePassword() {
  const dispatch = useAppDispatch()
const token = useAppSelector((store)=>store.userReducer.token)
const router = useRouter()
  const passwordRegex =
    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

  const schema = object({
    currentPassword: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one lower case English constter, one number"
      ),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one lower case English constter, one number"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf(
        [ref("password")],
        "Password & Confirm password should be the same"
      ),
  });

  async function handleSubmit(values:ChangePasswordValues) {
    const toastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        method: "PUT",
        headers: {
          token,
        },
        data: values,
      };

      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success(
          "Your Password has been changed successfully, Try to signIn "
        );
       setTimeout(() => {
  router.push('/login');
  dispatch(setToken(null))
  
}, 1500);
      }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
    toast.error(error.response.data.message);}
     
    } finally {
      toast.dismiss(toastId);
    }
  }

  const formik = useFormik<ChangePasswordValues>({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-[60vh] px-4 md:px-0">
        <div className="flex flex-col justify-center items-center border-solid rounded-md shadow-md bg-gray-200 w-full md:w-1/2 ">
          <h2 className="font-semibold text-gray-600 my-4">
            Change Your Password
          </h2>

          <form
            className="w-3/4 flex justify-center flex-col space-y-4 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="current-password">
              <input
                className="form-control"
                name="currentPassword"
                type="password"
                placeholder="Current password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
              />
              {formik.touched.currentPassword && formik.errors.currentPassword && (
                <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
              )}
            </div>

            <div className="new-password">
              <input
                className="form-control"
                name="password"
                type="password"
                placeholder="New password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <div className="re-password">
              <input
                className="form-control"
                name="rePassword"
                type="password"
                placeholder="Re-enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
              )}
            </div>

            <button type="submit" className="btn bg-green-600 mb-4 cursor-pointer">
              Submit
            </button>
          </form>

        </div>
      </section>
    </>
  );
}

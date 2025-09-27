"use client";

import { useAppSelector } from "@/hooks/store.hook";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Zod schema for shipping address
const checkoutSchema = z.object({
  shippingAddress: z.object({
    city: z.string().min(2, "City is required"),
    phone: z
      .string()
      .regex(/^01[0-9]{9}$/, "Phone number must be a valid Egyptian phone (11 digits starting with 01)"),
    details: z.string().min(5, "Details must be at least 5 characters"),
  }),
});

// 🔹 Infer TS type
type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckOut() {
  const cartInfo = useAppSelector((store) => store.cartReducer.cartInfo);
  const { data: session } = useSession();
  const token = session?.user?.accessToken as string | undefined;
  const router = useRouter();

  // 🔹 React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: {
        city: "",
        phone: "",
        details: "",
      },
    },
  });

  // 🔹 Submit handler
  async function createOrder(values: CheckoutFormValues) {
    const toastId = toast.loading("We are creating your order ....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo?.cartId}`,
        method: "POST",
        headers: { token },
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Your order has been created");
        setTimeout(() => {
          router.push("/allorders");
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
    <>
      <h1 className="mb-4 text-center md:text-start">Shipping Address</h1>
      <form
        className="space-y-4 w-3/4 mx-auto md:w-full"
        onSubmit={handleSubmit(createOrder)}
      >
        {/* City */}
        <div className="city">
          <input
            type="text"
            placeholder="City"
            className="form-control"
            {...register("shippingAddress.city")}
          />
          {errors.shippingAddress?.city && (
            <p className="text-red-500 text-sm mt-1">
              *{errors.shippingAddress.city.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="phone">
          <input
            type="tel"
            placeholder="Phone"
            className="form-control"
            {...register("shippingAddress.phone")}
          />
          {errors.shippingAddress?.phone && (
            <p className="text-red-500 text-sm mt-1">
              *{errors.shippingAddress.phone.message}
            </p>
          )}
        </div>

        {/* Details */}
        <div className="details">
          <textarea
            placeholder="Details"
            className="form-control"
            {...register("shippingAddress.details")}
          />
          {errors.shippingAddress?.details && (
            <p className="text-red-500 text-sm mt-1">
              *{errors.shippingAddress.details.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn mr-2 bg-blue-500 hover:bg-blue-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </>
  );
}

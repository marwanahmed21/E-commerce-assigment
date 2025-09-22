"use client";
import CartItem from "@/components/CartItem/CartItem";
import Loading from "@/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { clearCart, getCartInfo } from "@/store/feature/cart.slice";
import Link from "next/link";
import { useEffect } from "react";

export default function Cart() {
  const cartInfo = useAppSelector((store) => store.cartReducer.cartInfo);
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.userReducer.token);

  useEffect(() => {
    if (token) {
      dispatch(getCartInfo(token));
    }
  }, [cartInfo]);
  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="my-8 px-4 ">
          <div className="flex items-center gap-8 s">
            <i className="fa-brands fa-opencart text-2xl"></i>
            <h2 className="relative text-xl text-slate-600 font-semibold pl-4 before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
              Your Shopping Cart
            </h2>
          </div>
          {cartInfo.data.products.length === 0 ? (
            <div className="bg-gray-100 rounded-md  mt-5 shadow p-8 flex flex-col justify-center items-center gap-4 ">
              <h2>
                Oops! Your Cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </h2>
              <Link
                href={"/"}
                className="btn bg-yellow-400 hover:bg-yellow-500"
              >
                {" "}
                Back To Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-4">
                {cartInfo.data.products.map((product) => (
                  <CartItem key={product._id} cartInfo={product} />
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl">
                  Your Total Cart Price is{" "}
                  <span className="text-yellow-400 font-semibold">
                    {cartInfo.data.totalCartPrice}
                  </span>
                </p>
                <button
                  onClick={() => {
                    if (token) {
                      dispatch(clearCart(token));
                    }
                  }}
                  className="btn flex justify-center items-center bg-red-500 hover:bg-red-600 cursor-pointer"
                >
                  <i className="fa-solid fa-trash mr-2"></i> Clear Cart
                </button>
              </div>
              <Link
                href={"/checkout"}
                className="inline-block btn bg-green-600 hover:bg-green-700 text-white text-center mt-6 w-full"
              >
                Checkout
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}

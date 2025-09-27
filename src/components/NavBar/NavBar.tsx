"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import toast from "react-hot-toast";
import { getCartInfo } from "@/store/feature/cart.slice";
import { getWishListInfo } from "@/store/feature/wishlist.slice";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: session } = useSession();
  const token = session?.user?.accessToken as string | undefined;

  const cartInfo = useAppSelector((store) => store.cartReducer.cartInfo);
  const wishlist = useAppSelector(
    (store) => store.wishListReducer.wishListInfo
  );

  const [isUserHidden, setIsUserHidden] = useState("hidden");
  const [isMenuHidden, setIsMenuHidden] = useState("hidden");

  const handleUserOpen = () => setIsUserHidden("visible");
  const handleUserClose = () => setIsUserHidden("hidden");

  const handleMenuOpen = () => setIsMenuHidden("visible");
  const handleMenuClose = () => setIsMenuHidden("hidden");

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully");
    router.push("/login");
  };

  
  useEffect(() => {
    if (token) {
      dispatch(getCartInfo(token));
      dispatch(getWishListInfo(token));
    }
  }, [token, dispatch]);

  return (
    <div className="nav py-3 shadow bg-slate-200 fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center gap-10 px-3 mx-auto">
        <Link href={"/"}>
          <span className="font-bold text-2xl">Exclusive</span>
        </Link>

        {token && (
          <>
            {/* Menu for logged-in users */}
            <ul className="hidden md:flex items-center gap-5">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/product">Products</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/brands">Brands</Link></li>
              <li><Link href="/allorders">Orders</Link></li>
            </ul>

            {/* Cart */}
            <Link
              href={"/cart"}
              className="hidden lg:inline-block cart cursor-pointer ml-auto relative"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              <div className="cart-counter absolute h-5 w-5 rounded-full right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-white flex justify-center items-center">
                {cartInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <span>{cartInfo.numOfCartItems}</span>
                )}
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href={"/wishlist"}
              className="hidden lg:inline-block cart cursor-pointer relative"
            >
              <i className="fa-solid fa-list text-lg text-green-600"></i>
              <div className="cart-counter absolute h-5 w-5 rounded-full right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-green-600 text-white flex justify-center items-center">
                {wishlist === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <span>{wishlist.count}</span>
                )}
              </div>
            </Link>
          </>
        )}

        {/* Right side */}
        <ul className="flex items-center gap-5 ml-auto md:m-0">
          {!token ? (
            <>
              <li><Link href="/signup">Signup</Link></li>
              <li><Link href="/login">Login</Link></li>
            </>
          ) : (
            <>
              {/* User Dropdown */}
              <div
                onClick={() =>
                  isUserHidden === "hidden" ? (handleUserOpen(), handleMenuClose()) : handleUserClose()
                }
                className="cursor-pointer w-8 h-8 rounded-full bg-gray-700 text-white flex justify-center items-center relative"
              >
                <i className="fa-solid fa-user"></i>
                <div
                  className={`absolute bg-slate-100 top-10 z-50 w-52 right-0 rounded-md ${isUserHidden}`}
                >
                  <ul className="flex flex-col justify-center items-center gap-3 text-slate-700">
                    <li className="border-b border-slate-600 w-full text-center py-2">
                      <Link href="/changePassword">Change your password</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="mb-3 inline-block text-red-600"
                      >
                        <i className="fa-solid fa-right-from-bracket text-lg"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile Menu */}
              <div
                onClick={() =>
                  isMenuHidden === "hidden" ? (handleMenuOpen(), handleUserClose()) : handleMenuClose()
                }
                className="border border-slate-400 rounded px-2 py-1 relative md:hidden"
              >
                <i className="fa-solid fa-bars"></i>
                <div
                  className={`absolute bg-slate-100 top-10 z-50 w-52 right-0 rounded-md ${isMenuHidden}`}
                >
                  <ul className="flex flex-col justify-center items-center gap-3 text-slate-700">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/product">Products</Link></li>
                    <li><Link href="/categories">Categories</Link></li>
                    <li><Link href="/brands">Brands</Link></li>
                    <li><Link href="/allorders">Orders</Link></li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

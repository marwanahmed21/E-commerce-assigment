"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { addProductToCart } from "@/store/feature/cart.slice";
import {
  addProductToWishList,
  getWishListInfo,
  removeProductFromWishList,
} from "@/store/feature/wishlist.slice";
import { Product } from "@/types/products.types";
import Image from "next/image";
import Link from "next/link";

export default function Card({ productInfo }: { productInfo: Product }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.userReducer.token);
  const wishList = useAppSelector(
    (store) => store.wishListReducer.wishListInfo
  );
  return (
    <>
      <div className="card group/card  shadow-lg overflow-hidden rounded-xl">
        <div className="relative w-full ">
          <Image
            src={productInfo.imageCover}
            alt="Product Image"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
          <div className="layer group-hover/card:opacity-100 flex justify-center items-center gap-4 absolute w-full h-full left-0 top-0 bg-slate-400 bg-opacity-40 opacity-0 transition-opacity duration-300">
            {wishList === null ? (
              <div
                onClick={() => {
                  if (token) {
                    dispatch(
                      addProductToWishList({ productId: productInfo.id, token })
                    );
                  }
                }}
                className={`w-8 h-8 rounded-full bg-yellow-600 text-white flex justify-center items-center cursor-pointer`}
              >
                <i className="fa-solid fa-list"></i>
              </div>
            ) : (
              <div
                onClick={() => {
                  if (
                    wishList.data.some(
                      (product) => product.id === productInfo.id
                    ) &&
                    token
                  ) {
                    dispatch(
                      removeProductFromWishList({
                        productId: productInfo.id,
                        token,
                      })
                    );
                    dispatch(getWishListInfo(token));
                  } else {
                    dispatch(
                      addProductToWishList({
                        productId: productInfo.id,
                        token: token!,
                      })
                    );
                    dispatch(getWishListInfo(token!));
                  }
                }}
                className={`w-8 h-8 rounded-full ${
                  wishList.data.some((product) => product.id === productInfo.id)
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }   text-white flex justify-center items-center cursor-pointer`}
              >
                <i className="fa-solid fa-list"></i>
              </div>
            )}

            <div
              onClick={() => {
                if (token) {
                  dispatch(
                    addProductToCart({ productId: productInfo.id, token })
                  );
                }
              }}
              className="w-8 h-8 rounded-full bg-yellow-600 text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              href={`/product/${productInfo.id}`}
              className="w-8 h-8 rounded-full bg-yellow-600 text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-regular fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="card-body space-y-2 px-3 py-2">
          <div className="card-header ">
            <h3 className="text-lg font-semibold  line-clamp-1">
              <Link href={`/product/${productInfo._id}`}>
                {productInfo.title}
              </Link>
            </h3>
            <h2 className="text-sm text-gray-600 ">
              {productInfo.category.name}
            </h2>
          </div>
          <p className="text-White-100 text-sm line-clamp-2">
            {productInfo.description}
          </p>
          <div className="flex justify-between items-center">
            <p>{productInfo.price} EGP</p>
            <div className="rate flex justify-center items-center">
              <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
              <p>{productInfo.ratingsAverage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

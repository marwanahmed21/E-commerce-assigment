import { FullCartResponse } from "./cartInfo.types";

export type CartState = {
    cart: null | AddToCartResponse
    cartInfo : null | FullCartResponse
}

export interface AddToCartResponse {
  status: "success";
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProductItem[];
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
  totalCartPrice: number;
}

export interface CartProductItem {
  count: number;
  _id: string;
  product: string; // product ID only
  price: number;
}




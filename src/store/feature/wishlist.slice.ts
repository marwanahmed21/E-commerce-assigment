import { WishlistState } from "@/types/wishlist.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: WishlistState = {
  wishList: null,
  wishListInfo: null,
};

export const addProductToWishList = createAsyncThunk(
  "wishList/addProductToWishList",
  async (
    { productId, token }: { productId: string; token: string },
    { dispatch }
  ) => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        productId,
      },
    };
    dispatch(getWishListInfo(token));
    const { data } = await axios.request(options);
    return data;
  }
);

export const getWishListInfo = createAsyncThunk(
  "wishList/getWishListInfo",
  async (token: string) => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    return data;
  }
);

export const removeProductFromWishList = createAsyncThunk(
  "wishList/removeProductFromWishList",
  async (
    { productId, token }: { productId: string; token: string },
    { dispatch }
  ) => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    dispatch(getWishListInfo(token));

    const { data } = await axios.request(options);
    return data;
  }
);

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductToWishList.fulfilled, (state, action) => {
      console.log({ state, action });

      if (action.payload.status === "success") {
        toast.success("Product added successfully to your wishlist");
        state.wishList = action.payload;
      }
    });
    builder.addCase(addProductToWishList.rejected, (state, action) => {
      console.log({ state, action });
    });
    builder.addCase(getWishListInfo.fulfilled, (state, action) => {
      state.wishListInfo = action.payload;
    });
    builder.addCase(getWishListInfo.rejected, (state, action) => {
      console.log({ state, action });
    });
    builder.addCase(removeProductFromWishList.fulfilled, (state, action) => {
      console.log({ state, action });
      if (
        action.payload.message ===
        "Product removed successfully to your wishlist"
      ) {
        toast.success("Product removed successfully to your wishlist");
        state.wishListInfo = action.payload;
      }
    });
    builder.addCase(removeProductFromWishList.rejected, (state, action) => {
      console.log({ state, action });
    });
  },
});

export const wishListReducer = wishListSlice.reducer;

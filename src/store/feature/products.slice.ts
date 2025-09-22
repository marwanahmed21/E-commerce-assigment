import { ProductsState } from "@/types/products.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";

const initialState: ProductsState = {
  products: null,
  product: null,
  relatedProducts: null,
};
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id: string) => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data.data;
  }
);

export const getRelatedProducts = createAsyncThunk(
  "relatedProducts/getRelatedProducts",
  async (id: string) => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log({ state, action });
    });

    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.product = action.payload;
    });

    builder.addCase(getProductDetails.rejected, (state, action) => {
      console.log({ state, action });
      if (action.meta.requestStatus === "rejected") {
        toast.error("there is no product with this id");
        setTimeout(() => {
          window.location.href = "/product";
        }, 1500);
      }
    });

    builder.addCase(getRelatedProducts.fulfilled, (state, action) => {
      state.relatedProducts = action.payload.data;
    });
    builder.addCase(getRelatedProducts.rejected, (state, action) => {
      console.log({ state, action });
    });
  },
});

export const productsReducer = productsSlice.reducer;

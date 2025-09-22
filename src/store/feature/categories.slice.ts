import { CategoriesState } from "@/types/categories.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CategoriesState = {
  categories: null,
  category: null,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  }
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (id: string) => {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  }
);

const categoriesSlice = createSlice({
  name: " categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      console.log({ state, action });
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload.data;
      console.log(state.category);
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      console.log({ state, action });
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

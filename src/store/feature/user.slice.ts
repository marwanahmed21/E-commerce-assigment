import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userState } from "@/types/user.types";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: userState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  err: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ New reducer to rehydrate token
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token); // ✅ Persist
      toast.success("Logged in successfully");
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.meta.requestStatus === "rejected") {
        toast.error("Login failed. You should sign up first");
      }
    });
  },
});

export const { setToken } = userSlice.actions;
export const userReducer = userSlice.reducer;

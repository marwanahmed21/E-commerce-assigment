

"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/store.hook";
import { setToken } from "@/store/feature/user.slice";

export default function ReduxHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return null;
}

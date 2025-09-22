"use client";

import { useAppSelector } from "@/hooks/store.hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.userReducer.token);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !token && !redirected) {
      const toastId = toast.loading("Redirecting to login...");
      setRedirected(true); // ✅ Prevent double redirect
      router.replace("/login");
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 1500);
    }
  }, [mounted, token, redirected, router]);

  if (!mounted || !token) return null;
 

  return <>{children}</>;
}

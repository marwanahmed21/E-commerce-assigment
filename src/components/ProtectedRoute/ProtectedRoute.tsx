"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && !redirected) {
      const toastId = toast.loading("Redirecting to login...");
      setRedirected(true);
      router.replace("/login");
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 1500);
    }
  }, [status, redirected, router]);

  if (status === "loading") return null; // prevent flicker

  if (status === "unauthenticated") return null;

  return <>{children}</>;
}

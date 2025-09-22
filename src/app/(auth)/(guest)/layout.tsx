"use client";

import GuestRoute from "@/components/GuestRoute/GuestRoute";
import { ReactNode } from "react";

export default function GuestLayout({ children }: { children: ReactNode }) {
    return <GuestRoute>{children}</GuestRoute>;
}

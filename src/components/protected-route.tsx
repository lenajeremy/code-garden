"use client";

import MainContext from "@/lib/main-context";
import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { userDetails, loading } = useContext(MainContext);

  useEffect(() => {
    console.log({loading, userDetails})
    if (!loading && !userDetails) {
      router.replace("/auth/login");
    }
  }, [router, loading, userDetails]);

  if (loading || !userDetails) {
    return <></>;
  } else {
    return children;
  }
}

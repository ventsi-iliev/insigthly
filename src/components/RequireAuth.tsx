"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthReady, isAuthenticated, pathname, router]);

  if (!isAuthReady) {
    return <AuthLoadingScreen variant="app" />;
  }

  if (!isAuthenticated) {
    return <AuthLoadingScreen variant="app" />;
  }

  return <>{children}</>;
}

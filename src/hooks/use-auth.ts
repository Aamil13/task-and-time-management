import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { getCookie } from "@/lib/cookie";

export const useAuthGuard = (redirectTo: string, protect: "authenticated" | "unauthenticated") => {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const token = getCookie("token");

  useEffect(() => {
    const hasToken = !!token;
    const isAuth = isAuthenticated && hasToken;

    // If protecting "authenticated" pages (like dashboard), redirect if not authenticated
    if (protect === "authenticated" && !isAuth) {
      router.push(redirectTo);
    }
    // If protecting "unauthenticated" pages (like login/signup), redirect if authenticated
    else if (protect === "unauthenticated" && isAuth) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, token, router, redirectTo, protect]);
};

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useStore, clearStore } from "@/store";
import { login, register, getMe, logout } from "./api";
import type { LoginData, RegisterData, AuthResponse } from "./types";
import type { AxiosResponse } from "axios";
import { useCustomToast, getErrorMessage } from "@/lib/toast";
import { setCookie, deleteCookie } from "@/lib/cookie";

export const useLogin = () => {
  const { showPromise } = useCustomToast();
  const store = useStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginData) =>
      showPromise(login(data), {
        loading: "Logging in...",
        success: () => "Welcome back!",
        error: (err) => getErrorMessage(err),
      }),
    onSuccess: (res: AxiosResponse<AuthResponse>) => {
      console.log("res", res.data.token)
      setCookie("token", res.data.token);
      store.setAuth(res.data.user);
      router.push("/dashboard");
    },
    mutationKey: ["login"],
  });
};

export const useRegister = () => {
  const { showPromise } = useCustomToast();
  const store = useStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterData) =>
      showPromise(register(data), {
        loading: "Creating account...",
        success: () => "Account created successfully!",
        error: (err) => getErrorMessage(err),
      }),
    onSuccess: (res: AxiosResponse<AuthResponse>) => {
      setCookie("token", res.data.token);
      store.setAuth(res.data.user);
      router.push("/dashboard");
    },
    mutationKey: ["register"],
  });
};

export const useLogout = () => {
  const { showPromise } = useCustomToast();
  const store = useStore();
  const router = useRouter();

  return useMutation({
    mutationFn: () =>
      showPromise(logout(), {
        loading: "Logging out...",
        success: () => "Logged out successfully",
        error: (err) => getErrorMessage(err),
      }),
    onSuccess: () => {
      // Clear the token from cookies
      deleteCookie("token");
      // Clear the persisted store from localStorage
      clearStore();
      // Clear the store state
      store.logout();
      // Redirect to login
      router.push("/login");
    },
    mutationKey: ["logout"],
  });
};

export const useMe = () => {
  return useQuery<AuthResponse["user"]>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMe();
      return res.data;
    },
    retry: false,
  });
};

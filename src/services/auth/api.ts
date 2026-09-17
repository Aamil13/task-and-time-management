import client from "../api-client";
import type { LoginData, RegisterData, AuthResponse } from "./types";
import type { AxiosResponse } from "axios";

export async function login(data: LoginData): Promise<AxiosResponse<AuthResponse>> {
  return client.post<AuthResponse>("/auth/login", data);
}

export async function register(data: RegisterData): Promise<AxiosResponse<AuthResponse>> {
  return client.post<AuthResponse>("/auth/register", data);
}

export async function getMe(): Promise<AxiosResponse<AuthResponse["user"]>> {
  return client.get<AuthResponse["user"]>("/auth/me");
}

export async function logout(): Promise<void> {
  await client.post("/auth/logout");
}

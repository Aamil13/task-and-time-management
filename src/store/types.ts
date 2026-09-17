import type { StateCreator } from "zustand";

export type Theme = "light" | "dark";

export interface ThemeSlice {
  theme: Theme;

  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface AuthSlice {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;

  login: (user: { id: string; name: string; email: string }) => void;
  setAuth: (user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

export type Store = ThemeSlice & AuthSlice;

export type SliceCreator<T> = StateCreator<
  Store,
  [],
  [],
  T
>;
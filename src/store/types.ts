import type { StateCreator } from "zustand";

export type Theme = "light" | "dark";

export interface ThemeSlice {
  theme: Theme;

  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export type Store = ThemeSlice;

export type SliceCreator<T> = StateCreator<
  Store,
  [],
  [],
  T
>;
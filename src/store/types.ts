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

 export interface TimerSlice {
  activeTaskId: string | null;
  /** ISO 8601 timestamp the active session started at, or null if idle. */
  startedAt: string | null;
  startTracking: (taskId: string) => void;
  stopTracking: () => void;
}


export type Store = ThemeSlice & AuthSlice & TimerSlice;

export type SliceCreator<T> = StateCreator<
  Store,
  [],
  [],
  T
>;
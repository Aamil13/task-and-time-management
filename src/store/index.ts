import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Store } from "./types";
import { createThemeSlice } from "./slices/theme-slice";

export const useStore = create<Store>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
    }),
    {
      name: "task-management-store",
    }
  )
);
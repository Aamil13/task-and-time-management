import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Store } from "./types";
import { createThemeSlice } from "./slices/theme-slice";
import { createAuthSlice } from "./slices/auth-slice";
import { createTimeSlice } from "./slices/time-slice";
import { createUISlice } from "./slices/ui-slice";

export const useStore = create<Store>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
      ...createAuthSlice(...args),
      ...createTimeSlice(...args),
      ...createUISlice(...args),
    }),
    {
      name: "task-management-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Helper function to clear the persisted storage
export const clearStore = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("task-management-store");
  }
};
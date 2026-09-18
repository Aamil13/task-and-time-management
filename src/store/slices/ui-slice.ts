import type { UISlice, SliceCreator } from "../types";

export const createUISlice: SliceCreator<UISlice> = (set) => ({
  sidebarOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  closeSidebar: () => set({ sidebarOpen: false }),
});

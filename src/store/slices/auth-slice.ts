import type { AuthSlice, SliceCreator } from "../types";

export const createAuthSlice: SliceCreator<AuthSlice> = (set, get) => ({
  isAuthenticated: false,
  user: null,

  login: (user) => {
    set({
      isAuthenticated: true,
      user,
    });
  },

  setAuth: (user) => {
    set({
      isAuthenticated: true,
      user,
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
});

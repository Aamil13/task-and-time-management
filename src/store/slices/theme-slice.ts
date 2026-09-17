import type { ThemeSlice, SliceCreator } from "../types";

const applyTheme = (theme: "light" | "dark") => {
  if (typeof document === "undefined") return;

  document.documentElement.classList.toggle(
    "dark",
    theme === "dark"
  );
};

export const createThemeSlice: SliceCreator<ThemeSlice> = (set, get) => ({
  theme: "light",

  setTheme: (theme) => {
    applyTheme(theme);

    set({
      theme,
    });
  },

  toggleTheme: () => {
    const currentTheme = get().theme;

    const nextTheme =
      currentTheme === "light" ? "dark" : "light";

    applyTheme(nextTheme);

    set({
      theme: nextTheme,
    });
  },
});
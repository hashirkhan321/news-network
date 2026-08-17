import { createContext, useContext } from "react";
import type { Theme, View } from "./types";

export interface AppContextValue {
  theme: Theme;
  isDark: boolean;
  toggleDark: () => void;
  view: View;
  navigate: (next: View) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (updater: boolean | ((prev: boolean) => boolean)) => void;
  bookmarks: Set<number>;
  toggleBookmark: (id: number) => void;
  showToast: (message: string) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppContext.Provider");
  }
  return ctx;
}

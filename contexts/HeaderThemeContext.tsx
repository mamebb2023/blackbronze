"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

interface HeaderThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const HeaderThemeContext = createContext<HeaderThemeContextType | undefined>(undefined);

// Module-level state to allow external toggle function
let globalToggleRef: (() => void) | null = null;

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Register the toggle function globally
  useEffect(() => {
    globalToggleRef = toggleTheme;
    return () => {
      globalToggleRef = null;
    };
  }, [toggleTheme]);

  return (
    <HeaderThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  const context = useContext(HeaderThemeContext);
  if (context === undefined) {
    throw new Error("useHeaderTheme must be used within a HeaderThemeProvider");
  }
  return context;
}

// Exported function that can be called from anywhere
export function toggleHeaderTheme() {
  if (globalToggleRef) {
    globalToggleRef();
  } else {
    console.warn("HeaderThemeProvider is not mounted. Cannot toggle theme.");
  }
}


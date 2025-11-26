"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * ThemeProvider component that manages theme state globally.
 * Defaults to dark mode and persists theme preference to localStorage.
 * @param {ReactNode} children - React components to wrap
 * @param {Theme} defaultTheme - Initial theme (defaults to "dark")
 * @param {string} storageKey - Key for localStorage persistence
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "dark",
  storageKey = "theme-preference",
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Only access localStorage on the client side
    if (typeof window === "undefined") {
      return defaultTheme;
    }

    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme && (storedTheme === "dark" || storedTheme === "light")) {
      return storedTheme;
    }

    // Check system preference if no stored preference exists
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  const mountedRef = useRef(false);

  // Apply theme to DOM after hydration
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const toggleTheme = (): void => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  // Render provider immediately without hydration mismatch checks
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * useTheme hook to access theme context
 * @returns {ThemeContextType} Theme context value
 * @throws {Error} If used outside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

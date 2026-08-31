import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("eventhub-theme") || "indigo"
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("eventhub-dark") === "true"
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(
      "theme-indigo",
      "theme-purple",
      "theme-emerald",
      "theme-rose"
    );

    root.classList.add(`theme-${theme}`);

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("eventhub-theme", theme);
    localStorage.setItem("eventhub-dark", darkMode);
  }, [theme, darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
import { createContext, useEffect, useState, type ReactNode } from "react";

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const themeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => { },
});
type Props = {
  children: ReactNode;
};

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>(() => {
    const stored = localStorage.getItem("theme");
    return stored === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () =>
    setTheme((prev) => (prev === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeContextProvider;

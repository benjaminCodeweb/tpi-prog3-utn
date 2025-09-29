import { createContext, useEffect, useState, type ReactNode } from "react"

const themeValue = localStorage.getItem('theme')
const  DARK_THEME = 'dark';
const LIGHT_THEME = 'light'

type ThemeContextType = {
    theme: string,
    toggleTheme: () => void;
}

export const themeContext = createContext<ThemeContextType | undefined>(
    undefined
);

type Props = {
    children: ReactNode
}

const ThemeContextProvider  = ({children}: Props) => {
    const storedTheme = localStorage.getItem('theme') || LIGHT_THEME
    const [theme, setTheme] = useState(storedTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme])

    const toggleTheme = () => {
        if(theme === LIGHT_THEME) {
            
            localStorage.setItem('theme', DARK_THEME);
            setTheme(DARK_THEME)
        } else {
        
            localStorage.setItem('theme', LIGHT_THEME);
            setTheme(LIGHT_THEME);
        }
    };

    return (
        <themeContext.Provider value={{theme, toggleTheme}}>

            {children}
        </themeContext.Provider>
    )

};

export default ThemeContextProvider
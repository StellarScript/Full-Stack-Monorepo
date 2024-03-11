"use client";

import { createContext, useContext, useState } from "react";

interface ThemeContextType {
   theme: boolean;
   toggle: () => void;
}

const initialState: ThemeContextType = {
   theme: false,
   toggle: () => {
      return;
   },
};

export const ThemeContext = createContext<ThemeContextType>(initialState);

export const useTheme = (): ThemeContextType => useContext(ThemeContext);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
   const [theme, setTheme] = useState<boolean>(false);

   const toggle = () => {
      setTheme(!theme);
   };

   return (
      <ThemeContext.Provider value={{ theme, toggle }}>
         <html className={theme ? "dark" : ""}>{children}</html>
      </ThemeContext.Provider>
   );
};

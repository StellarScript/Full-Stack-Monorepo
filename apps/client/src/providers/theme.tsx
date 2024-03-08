"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@utils";

type ThemeProps = React.PropsWithChildren<{
   className?: string;
}>;

interface ThemeContextType {
   theme: string;
   toggle: () => void;
}

const initialState: ThemeContextType = {
   theme: "",
   toggle: () => {
      return;
   },
};

export const ThemeContext = createContext<ThemeContextType>(initialState);

export const useTheme = (): ThemeContextType => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProps> = ({ children, className }) => {
   const [theme, setTheme] = useState<string>("");

   const toggle = () => {
      setTheme(theme === "dark" ? "" : "dark");
   };

   return (
      <ThemeContext.Provider value={{ theme, toggle }}>
         <div className={cn(theme, className)}>{children}</div>
      </ThemeContext.Provider>
   );
};

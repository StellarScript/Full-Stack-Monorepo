"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@utils";

type ThemeProps = React.PropsWithChildren<{
   className?: string;
}>;

const initialState = {
   theme: "",
   toggle: () => {},
};
export const ThemeContext = createContext<typeof initialState>(initialState);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProps> = ({ children, className }) => {
   const [theme, setTheme] = useState("");

   const toggle = () => {
      setTheme(theme === "dark" ? "" : "dark");
   };

   return (
      <ThemeContext.Provider value={{ theme, toggle }}>
         <body className={cn(theme, className)}>{children}</body>
      </ThemeContext.Provider>
   );
};

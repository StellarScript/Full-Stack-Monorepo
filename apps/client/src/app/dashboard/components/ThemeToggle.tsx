"use client";

import { useTheme } from "@provider/theme";

export const ThemeToggle = () => {
   const { toggle, theme: currentTheme } = useTheme();

   return (
      <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
         {currentTheme ? <div className="sun-toggle"></div> : <div className="moon-toggle"></div>}
      </button>
   );
};

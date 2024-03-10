"use client";

import { useTheme } from "@provider/theme";

type ThemeButtonProps = {
   className?: string;
};

export const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
   const theme = useTheme();

   return (
      <button className={className} onClick={theme.toggle}>
         {theme.theme ? "light" : "dark"} mode
      </button>
   );
};

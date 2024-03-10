"use client";

import { useTheme } from "@provider/theme";

type ThemeButtonProps = React.PropsWithChildren<{
   className?: string;
}>;

export const ThemeButton: React.FC<ThemeButtonProps> = ({ children, className }) => {
   const theme = useTheme();

   return (
      <button className={className} onClick={theme.toggle}>
         {children}
      </button>
   );
};

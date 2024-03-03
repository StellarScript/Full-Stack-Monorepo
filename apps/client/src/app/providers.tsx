import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@provider/theme";
import { cn } from "@utils";
import { inter, lato } from "./fonts";

export function Providers({ children }: React.PropsWithChildren) {
   return (
      <ClerkProvider>
         <ThemeProvider className={cn(inter.variable, lato.variable)}>{children}</ThemeProvider>
      </ClerkProvider>
   );
}

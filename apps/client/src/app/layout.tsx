import "../styles/styles.css";
import "../styles/global.css";

import { cn } from "@utils";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@provider/theme";
import { inter, lato } from "./fonts";

export const metadata = {
   title: "Appify",
   description: "Welcome to Appify",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
   return (
      <ClerkProvider>
         <ThemeProvider>
            <body className={cn(inter.variable, lato.variable)}>
               <main>{children}</main>
            </body>
         </ThemeProvider>
      </ClerkProvider>
   );
}

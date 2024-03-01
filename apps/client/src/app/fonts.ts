import { Lato, Inter } from "next/font/google";

export const lato = Lato({
   subsets: ["latin"],
   weight: ["100", "300", "400", "700", "900"],
   variable: "--font-lato",
});

export const inter = Inter({
   subsets: ["latin"],
   weight: ["100", "300", "400", "700", "900"],
   variable: "--font-inter",
});

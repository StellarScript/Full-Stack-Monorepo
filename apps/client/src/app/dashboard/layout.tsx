import { ThemeProvider } from "@provider/theme";

export const metadata = {
   title: "Dashboard",
   description: "User Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <ThemeProvider>{children}</ThemeProvider>;
}

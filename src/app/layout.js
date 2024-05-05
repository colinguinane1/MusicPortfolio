import { Inter, Raleway, Nunito } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { useTheme } from 'next-themes'

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
const nunito = Nunito({subsets: ["latin"]})

export const metadata = {
  title: "Colin Guinane | Music Discography",
  description: "Music website for Colin Guinane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={raleway.className}>
      <ThemeProvider defaultTheme="system" attribute="class">
      
        <body className="bg-white dark:bg-black" >{children}</body>
      </ThemeProvider>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Colin Guinane | Music Discography",
  description: "Music website for Colin Guinane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-black'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import { Inter, Raleway } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Colin Guinane | Music Discography",
  description: "Music website for Colin Guinane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-black'>
      <body className={raleway.className}>{children}</body>
    </html>
  );
}

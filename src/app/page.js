"use client"
import Image from "next/image";
import Navbar from "./components/Navbar";
import Home from "./home/page";
import { Analytics } from "@vercel/analytics/react"


export default function Page() {

   
  return (
    <>
      <Analytics />
      <Home/>
    </>
  );
}

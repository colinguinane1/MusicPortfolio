import Image from "next/image";
import Index from "./components";
import { Analytics } from "@vercel/analytics/react"


export default function Home() {
  return (
    <>
    <Analytics/>
      <Index />
    </>
  );
}

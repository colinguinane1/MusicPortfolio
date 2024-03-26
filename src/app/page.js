import Image from "next/image";
import Index from "./components";
import { Analytics } from "@vercel/analytics/react"
import { Howl } from "howler";


export default function Home() {

   
  return (


    <>
    <Analytics/>
      <Index />
    </>
  );
}

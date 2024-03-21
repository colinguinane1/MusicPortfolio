import Image from "next/image";
import Index from "./components";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function Home() {
  return (
    <Index />
  );
}

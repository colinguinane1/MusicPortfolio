"use client";
import AudioPlayer from "../components/AudioPlayer";

import Navbar from "../components/Navbar";
import { motion, spring } from "framer-motion";
import Player from "../components/Player";
import { Poppins } from "next/font/google";
import { Raleway } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "900" });
const raleway = Raleway({ subsets: ["latin"] });

const Page = () => {
  return (
    <main className={raleway.className}>
      <div className="fixed z-[1000]">
        <Navbar />
      </div>
      <div className="">
        <AudioPlayer raleway={raleway} />
      </div>
    </main>
  );
};

export default Page;

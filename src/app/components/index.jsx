"use client";
import AudioPlayer from "./AudioPlayer";

import Navbar from "./Navbar";
import { motion, spring } from "framer-motion";
import Player from "./Player";
import { Poppins } from "next/font/google";
import { Raleway } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "900" });
const raleway = Raleway({ subsets: ["latin"] });

const Index = () => {
  return (
    <main className={raleway.className}>
      <motion.div
        initial={{ y: -100 }} // Start from off-screen (above)
        animate={{ y: 0 }} // Animate to y: 0 (on-screen)
        transition={{ duration: 0.6, type: spring }}
        className="fixed z-[1000]"
      >
        <Navbar />
      </motion.div>
      <div className="">
        <AudioPlayer raleway={raleway} />
      </div>
    </main>
  );
};

export default Index;

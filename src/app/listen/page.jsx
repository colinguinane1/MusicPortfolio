"use client";
import AudioPlayer from "../components/AudioPlayer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

const Listen = () => {
  return (
    <main className={raleway.className}>
      <div className="fixed z-[1000]">
        <Navbar />
      </div>
      <div>
        <AudioPlayer />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default Listen;

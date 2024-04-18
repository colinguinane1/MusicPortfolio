import AudioPlayer from "./AudioPlayer";
import Navbar from "./Navbar";
import Player from "./Player";
import { Poppins } from "next/font/google";
import { Raleway } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "900" });
const mont = Raleway({ subsets: ["latin"] });

const Index = () => {
  return (
    <main className={mont.className}>
      <div className="fixed z-[1000]">
        <Navbar />
      </div>
      <div className="">
        <AudioPlayer />
      </div>
    </main>
  );
};

export default Index;

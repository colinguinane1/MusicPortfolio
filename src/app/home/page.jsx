"use client";
import Navbar from "../components/Navbar";
import { motion, spring } from "framer-motion";
const Home = () => {
  return (
    <>
      <motion.div
        initial={{ y: -100 }} // Start from off-screen (above)
        animate={{ y: 0 }} // Animate to y: 0 (on-screen)
        transition={{ duration: 0.6, type: spring }}
        className="fixed z-[1000]"
      >
        <Navbar />
      </motion.div>
      <div>
        <h1 className="mt-20 absolute text-white">Page test</h1>
      </div>
    </>
  );
};

export default Home;

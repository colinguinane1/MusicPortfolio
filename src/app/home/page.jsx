"use client";
import Navbar from "../components/Navbar";
import { motion, spring } from "framer-motion";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ y: -100 }} // Start from off-screen (above)
        animate={{ y: 0 }} // Animate to y: 0 (on-screen)
        transition={{ duration: 0.3, type: spring }}
        className="fixed z-[1000]"
      >
        <Navbar />
      </motion.div>
      <div className="flex flex-col ">
        <div className="mt-20 ml-12 absolute text-white">
          <img
            className="rounded-full w-60 border-white border-2"
            src="hero.jpg"
          ></img>
          <h1 className="text-4xl font-extrabold py-2">Colin Guinane</h1>
          <p className="font-bold text-2xl py-2">Composer</p>
          <p className="max-w-96 py-2">
            I'm a completely self-taught musician that has been making music for
            over 6 years.
          </p>
          <a href="listen">
            <button className="button-blue-gradient  py-2">Listen</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;

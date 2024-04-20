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
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="flex flex-col no_transition "
      >
        <div className="mt-20 ml-4 absolute text-white">
          <img
            className="rounded-full w-60 border-white border-2"
            src="hero.jpg"
          ></img>
          <h1 className="text-4xl font-extrabold py-2">Colin Guinane</h1>
          <p className="font-bold text-2xl py-2">Composer</p>
          <p className="max-w-96 py-2">
            I&apos;m a completely self-taught musician that has been making
            music for over 6 years.
          </p>
          <div className="border-b py-2">
            <a className="" href="listen">
              <button className="button-blue-gradient">Listen</button>
            </a>
          </div>
          <div className="py-2 flex">
            <a>
              <button className="button-spotify">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brand-spotify stroke-black"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
                  <path d="M9 15c1.5 -1 4 -1 5 .5" />
                  <path d="M7 9c2 -1 6 -2 10 .5" />
                </svg>
              </button>
            </a>
            <a>
              <button className="button-apple">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brand-apple stroke-black"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077z" />
                  <path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
                </svg>
              </button>
            </a>
            <a>
              <button className="button-youtube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brand-youtube-filled"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z"
                    stroke-width="0"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;

"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, spring } from "framer-motion";
import Post1 from "../blog/posts/21.04.2024";

const Home = () => {
  return (
    <main>
      <div>
        <motion.div
          initial={{ y: -100 }} // Start from off-screen (above)
          animate={{ y: 0 }} // Animate to y: 0 (on-screen)
          transition={{ duration: 0.3, type: spring }}
          className="fixed z-[1000]"
        >
          <Navbar />
        </motion.div>
        <motion.div
          initial={{ y: 1000, opacity: -1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex flex-col no_transition items-center"
        >
          <div className="absolute mt-20 items-center mx-4   text-white">
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
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button-blue-gradient no_transition"
                >
                  Listen{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-arrow-bar-right ml-1 stroke-white"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 12l-10 0" />
                    <path d="M20 12l-4 4" />
                    <path d="M20 12l-4 -4" />
                    <path d="M4 4l0 16" />
                  </svg>
                </motion.button>
              </a>
            </div>
            <div className="py-2 border-b border-white flex pt-3 justify-between">
              <a
                href="https://open.spotify.com/artist/6GyssrUS3aQUTHtczcm3IY"
                target="_blank"
              >
                <button className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-spotify stroke-white hover:scale-105 active:scale-95 hover:stroke-green-500"
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
              <a
                href="https://music.apple.com/us/artist/colin-guinane/1525091289"
                target="_blank"
              >
                <button className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-apple stroke-white hover:scale-105 active:scale-95 hover:stroke-pink-500 hover:fill-black"
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
              <a
                href="https://www.youtube.com/channel/UC-EKgpKHMRdJOfblAK6go1g"
                target="_blank"
              >
                <button className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-youtube-filled stroke-white hover:scale-105 active:scale-95 hover:fill-red-500"
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
              <a
                href="https://www.instagram.com/colingmusic/?hl=en"
                target="_blank"
              >
                <button className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-instagram stroke-white hover:scale-105 active:scale-95 hover:fill-pink-500"
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
                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M16.5 7.5l0 .01" />
                  </svg>
                </button>
              </a>
              <a href="https://twitter.com/colinguinane" target="_blank">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-x stroke-white hover:scale-105 active:scale-95"
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
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                </button>
              </a>
            </div>
            <div className="py-2">
              <h1 className="font-extrabold text-3xl pb-4 py-4">About Me</h1>
              <p className="max-w-[32rem] border-b pb-4">
                Welcome to my music page! I specialize in crafting emotive and
                cinematic orchestral film score-style music that transports
                listeners to captivating worlds of sound. With a passion for
                storytelling through melody and harmony.<br></br>
                <br></br>I&apos;ve been honing my craft since the age of 14.
                Each composition is a journey, weaving together intricate
                arrangements and evocative themes to evoke powerful emotions and
                paint vivid musical landscapes. Join me on this sonic adventure
                as we explore the boundless possibilities of music together.
              </p>
              <h1 className="font-extrabold text-3xl pb-4 py-4">
                Recent Post:
              </h1>
              <div className="flex flex-col items-center max-w-[32rem] border p-4 rounded-md">
                <a href="blog" className="text-sm">
                  <Post1 />
                </a>
              </div>
            </div>{" "}
            <div className=" w-full bottom-0 mt-20">
              <Footer />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;

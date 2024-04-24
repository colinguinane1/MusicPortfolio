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
          className="flex flex-col no_transition items-center "
        >
          <div className="absolute mt-20 items-center mx-4 text-center max-w-[900px]   dark:text-white text-black">
            <div className="flex flex-col items-center">
              <img
                className="rounded-full w-60 dark:border-white border-black border-2 "
                src="hero.jpg"
              ></img>
            </div>
            <h1 className="text-4xl font-extrabold py-2">Colin Guinane</h1>
            <p className="font-bold text-2xl py-2">Composer</p>
            <p className=" py-2">
              I&apos;m a completely self-taught musician that has been making
              music for over 6 years.
            </p>
            <div className="border-b py-4">
              <a className="flex flex-col items-center" href="listen">
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
                    class="icon icon-tabler icon-tabler-arrow-bar-right ml-1 stroke-black dark:stroke-white"
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
            <div className="py-2 border-b flex pt-3 justify-between">
              <a
                href="https://open.spotify.com/artist/6GyssrUS3aQUTHtczcm3IY"
                target="_blank"
              >
                <button className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-spotify stroke-black dark:stroke-white hover:scale-105 active:scale-95 hover:stroke-green-500"
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
                    class="icon icon-tabler icon-tabler-brand-apple stroke-black dark:stroke-white hover:scale-105 active:scale-95 hover:stroke-pink-500 hover:fill-black"
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
                    class="icon icon-tabler icon-tabler-brand-youtube stroke-black dark:stroke-white hover:scale-105 active:scale-95 hover:stroke-red-500 hover:fill-black"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                    <path d="M10 9l5 3l-5 3z" />
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
                    class="icon icon-tabler icon-tabler-brand-instagram stroke-black dark:stroke-white hover:scale-105 active:scale-95 hover:stroke-pink-300"
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
                    class="icon icon-tabler icon-tabler-brand-x stroke-black dark:stroke-white hover:scale-105 active:scale-95 hover:stroke-blue-500"
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
              <p className=" border-b pb-4">
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
              {/*  --------------------- FAVORITE ARTISTS + SCORES ---------------------- */}
              <div className="border-b py-4">
                <h1 className="font-extrabold text-3xl">Favorite Artists</h1>
                {/* Artist 1 */}
                <div className="flex items-center py-3">
                  <div className="flex items-center">
                    <a
                      href="https://open.spotify.com/artist/692KvxElsJHIJQCS6Eoc32?si=pkwD2L_DSyCg3uPs7xHx3Q"
                      target="_blank"
                      className="flex items-center"
                    >
                      <img
                        src="https://static.wixstatic.com/media/26f451_b9384b46685f4aaa954285c72d0bb2e0~mv2.jpg/v1/fill/w_1264,h_1264,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/26f451_b9384b46685f4aaa954285c72d0bb2e0~mv2.jpg"
                        className="w-14 h-14 rounded-md"
                      />
                      <h1 className="text-xl font-extrabold px-3">
                        Sarah Schachner
                      </h1>
                    </a>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <a
                      href="https://open.spotify.com/album/4eUfjPGaHBA3AuR3gGdct0?autoplay=true"
                      target="_blank"
                    >
                      <img
                        src="https://i.scdn.co/image/ab67616d0000b273992ad8ffefc03006f08cc3f8"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                    <a
                      href="https://open.spotify.com/album/3eDpDVt0I1RGasXf4b0r4k?si=FW2VFCT-RPWiTIwqdzvb1w"
                      target="_blank"
                    >
                      <img
                        src="https://i.scdn.co/image/ab67616d0000b273edfb9417f1a80732792f7c18"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                  </div>
                </div>

                {/* Artist 2 */}
                <div className="flex items-center py-3">
                  <div className="flex items-center">
                    <a
                      href="https://open.spotify.com/artist/6dU7gPN2BhEPfO5QHLt7es?si=_UOeu8T0Rj2wLRi7gOtPpQ"
                      target="_blank"
                      className="flex items-center"
                    >
                      <img
                        src="https://yt3.googleusercontent.com/ytc/AIdro_k1zZniCdW3HwZOVE8PtpYbpJG5o4rPc5qacB5R-sC92w=s900-c-k-c0x00ffffff-no-rj"
                        className="w-14 h-14 rounded-md"
                      />
                      <h1 className="text-xl font-extrabold px-3">
                        Lorne Balfe
                      </h1>
                    </a>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <a
                      href="https://open.spotify.com/album/3tjIKRAPBy5Qu4z8F5HmBz?si=_LGXxI3CQ3KorY_rkM-b7A"
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/f/f5/Top_gun_maverick_soundtrack.jpeg"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                    <a
                      href="https://open.spotify.com/album/4QPkPa4bxs08SvFTpLwt1T?si=3VMzrAP3RU-eXcBJ9X-Grg"
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/7/77/Mission_Impossible_Fallout.jpg"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                  </div>
                </div>
                {/* Artist 3 */}
                <div className="flex items-center py-3">
                  <div className="flex items-center">
                    <a
                      href="https://open.spotify.com/artist/0YC192cP3KPCRWx8zr8MfZ?si=FNbmG_6tSOWRzDXA_gUfPw"
                      target="_blank"
                      className="flex items-center"
                    >
                      <img
                        src="https://i.scdn.co/image/ab6761610000e5eb371632043a8c12bb7eeeaf9d"
                        className="w-14 h-14 rounded-md"
                      />
                      <h1 className="text-xl font-extrabold px-3">
                        Hans Zimmer
                      </h1>
                    </a>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <a
                      href="https://open.spotify.com/album/5WmlAFcF8ERAnUvYrwJt91?si=MdfU6VioTkWq-yq5fXOZdQ"
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/b/bf/Man_of_Steel_Soundtrack_Cover.jpg"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                    <a
                      href="https://open.spotify.com/album/63uFfOZpC7jrV7wfuBY2lX?si=boEmOwGhRK-QY6yckvj4Mw"
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/c/c9/Darkknight_cd.jpg"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                  </div>
                </div>

                {/* Artist 4 */}
                <div className="flex items-center py-3">
                  <div className="flex items-center">
                    <a
                      href="https://open.spotify.com/artist/3MhnTc9AODdRGMrtntEqIz?si=M0petTWhTgadQEuvL1ntkQ"
                      target="_blank"
                      className="flex items-center"
                    >
                      <img
                        src="https://p16-tm-sg.tiktokmusic.me/img/tos-alisg-i-0000/52025400b97b4fb5a02bd30b842fe653~c5_750x750.image"
                        className="w-14 h-14 rounded-md"
                      />
                      <h1 className="text-xl font-extrabold px-3">
                        John Paesano
                      </h1>
                    </a>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <a
                      href="https://open.spotify.com/album/4HprkLzO577tGz5JFlg5uV?si=MNnN4wgMQuaJjaAaW863ig"
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Maze_Runner_%28Original_Motion_Picture_Soundtrack%29.jpg"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                    <a
                      href="https://open.spotify.com/album/0FzfO0ApQMiPSFMGjsNanb?si=lMIrFtcPT_yNeUKeRCRCeg"
                      target="_blank"
                    >
                      <img
                        src="https://i.scdn.co/image/ab67616d00001e0226241676a90ad94d2978825b"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                  </div>
                </div>

                {/* Artist 5 */}
                <div className="flex items-center py-3">
                  <div className="flex items-center">
                    <a
                      href="https://open.spotify.com/artist/5svDnd8joFhbpbA3Ar0CfN?si=Txy6XjCiTgWkjmFqPuoUEg"
                      target="_blank"
                      className="flex items-center"
                    >
                      <img
                        src="https://kraft-engel.com/wp-content/uploads/clients/tom-holkenborg/holkenborg.jpg"
                        className="w-14 h-14 rounded-md"
                      />
                      <h1 className="text-xl font-extrabold px-3">
                        Tom Holkenborg
                      </h1>
                    </a>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <a
                      href="https://open.spotify.com/album/61EYnZsY4PSE2uubb81wtB?si=0AayRfnEROuNRlezdcSt_A"
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/2/2e/Tom_Holkenborg_-_Zack_Snyder%27s_Justice_League.jpg"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                    <a
                      href="https://open.spotify.com/album/4PAHIwIasrswKSU5KDzROJ?si=dtS8coFwTx6ByaOUJYOQNg"
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/9/98/Batman_v_Superman_-_Dawn_of_Justice_%28soundtrack%29.jpg"
                        className="w-12 h-12 border rounded-md"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <h1 className="font-extrabold text-3xl pb-4 py-4">Recent Post</h1>
              <div className="flex flex-col items-center  border p-4 rounded-md">
                <a className="text-sm" href="blog">
                  <main>
                    <Post1 />
                  </main>
                </a>
              </div>
            </div>{" "}
            <div className=" w-full bottom-0 mt-4">
              <Footer />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;

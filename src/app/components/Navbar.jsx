"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  return (
    <main>
      <ThemeSwitcher />
      <div
        className={`fixed w-screen transition-all ${
          scrolled ? "border-b shadow-md" : ""
        } py-4 dark:bg-black bg-white`}
      >
        <ul className="dark:text-white flex justify-between mx-4 z-[100]">
          <li>
            <a
              className="navbar_text border border-black dark:border-white hover:rounded-full  p-2 font-extrabold"
              href="home"
            >
              CG
            </a>
          </li>
          <li>
            <a className="navbar_text hidden md:block " href="home">
              Home
            </a>
          </li>
          <li>
            <a className="navbar_text hidden md:block" href="listen">
              Listen
            </a>
          </li>
          <li>
            <a className="navbar_text hidden md:block" href="blog">
              Blog
            </a>
          </li>
          <li>
            <a className="navbar_text hidden md:block" href="contact">
              Contact
            </a>
          </li>
          <li>
            <a className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`icon icon-tabler icon-tabler-arrow-bar-left md:hidden cursor-pointer hover:stroke-blue-500 transition-all ${
                  menuOpen ? "rotate-180" : ""
                }`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                onClick={toggleMenu}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 12l10 0" />
                <path d="M4 12l4 4" />
                <path d="M4 12l4 -4" />
                <path d="M20 4l0 16" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed no_transition top-[57px] right-0 w-screen h-screen bg-black bg-opacity-75 z-[10000]"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, type: "spring" }}
            exit="hidden"
            variants={menuVariants}
          >
            <ul className="text-6xl dark:bg-black dark:bg-opacity-40 text-white bg-opacity-50 h-screen">
              <li className="pt-8 pb-4">
                <a
                  className="navbar_text font-extrabold flex group"
                  href="home"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-home-2 mt-[2px] mx-2 stroke-white group:stroke-blue-500"
                    width="55"
                    height="55"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M10 12h4v4h-4z" />
                  </svg>
                  HOME
                </a>
              </li>
              <li className="py-4">
                <a className="navbar_text font-extrabold flex" href="listen">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-headphones-filled mt-[2px] mx-2 stroke-white"
                    width="55"
                    height="55"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M21 18a3 3 0 0 1 -2.824 2.995l-.176 .005h-1a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-3a3 3 0 0 1 2.824 -2.995l.176 -.005h1c.351 0 .688 .06 1 .171v-.171a7 7 0 0 0 -13.996 -.24l-.004 .24v.17c.25 -.088 .516 -.144 .791 -.163l.209 -.007h1a3 3 0 0 1 2.995 2.824l.005 .176v3a3 3 0 0 1 -2.824 2.995l-.176 .005h-1a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-6a9 9 0 0 1 17.996 -.265l.004 .265v6z"
                      stroke-width="0"
                      fill="currentColor"
                    />
                  </svg>
                  LISTEN
                </a>
              </li>
              <li className="py-4">
                <a className="navbar_text font-extrabold flex" href="blog">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-article mt-[2px] mx-2 stroke-white"
                    width="55"
                    height="55"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                    <path d="M7 8h10" />
                    <path d="M7 12h10" />
                    <path d="M7 16h10" />
                  </svg>
                  BLOG
                </a>
              </li>
              <li className="py-4">
                <a className="navbar_text font-extrabold flex" href="contact">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-info-octagon mt-[2px] mx-2 stroke-white"
                    width="55"
                    height="55"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z" />
                    <path d="M12 9h.01" />
                    <path d="M11 12h1v4h1" />
                  </svg>
                  CONTACT
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Navbar;

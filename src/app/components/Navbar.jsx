"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  return (
    <main>
      <div className="fixed w-screen border-b py-4 bg-black">
        <ul className="text-white flex justify-between mx-4 z-[100]">
          <li>
            <a
              className="navbar_text border hover:rounded-full  p-2 font-extrabold"
              href="home"
            >
              CG
            </a>
          </li>
          <li>
            <a className="navbar_text hidden md:block" href="home">
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
                className={`icon icon-tabler icon-tabler-arrow-bar-left md:hidden cursor-pointer hover:stroke-blue-500 ${
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
            <ul className="text-6xl bg-black ml-4 bg-opacity-50 h-screen">
              <li className="pt-8 pb-4">
                <a
                  className="navbar_text font-extrabold"
                  href="home"
                  onClick={toggleMenu}
                >
                  HOME
                </a>
              </li>
              <li className="py-4">
                <a
                  className="navbar_text font-extrabold"
                  href="listen"
                  onClick={toggleMenu}
                >
                  LISTEN
                </a>
              </li>
              <li className="py-4">
                <a
                  className="navbar_text font-extrabold"
                  href="blog"
                  onClick={toggleMenu}
                >
                  BLOG
                </a>
              </li>
              <li className="py-4">
                <a
                  className="navbar_text font-extrabold"
                  href="contact"
                  onClick={toggleMenu}
                >
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

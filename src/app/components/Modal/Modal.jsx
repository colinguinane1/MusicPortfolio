// Modal.jsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import Player from "../Player";
import Backdrop from "./Backdrop";
import { useMediaQuery } from "@react-hook/media-query";
import { useGesture } from "react-use-gesture";
import Image from "next/image";

const Modal = ({
  setCurrentCover,
  currentCover,
  currentSong,

  folderName,
  isPlaying,
  folderContents,
  tidyFileName,
  tidyAlbumName,
  onClose,
  setCurrentSong,
  handlePlay,
  albumDescription,
  yearReleased,
  spotifyLink,
  appleMusicLink,
  artistChoice,
  websiteExclusive,
  youtubeLink,
  inspirationLink,
}) => {
  const artist = "Colin Guinane";
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [dropdown, enableDropdown] = useState(false);
  const [dominantColors, setDominantColors] = useState([]);
  const [songStopped, setSongStopped] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);

  /*   useEffect(() => {
    const fetchColors = async () => {
      try {
        const imageUrl = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`;
        extractColors(imageUrl).then(console.log);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    fetchColors();
  }, [folderName]); */

  const modalStyle = {
    backgroundImage: `url(https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg)`,
    // You can add additional styles here
  };
  const dropdownList = () => {
    enableDropdown(!dropdown); // Toggle the dropdown state
    console.log(dropdown); // Output the current state (before the toggle)
  };

  const dropdownModalCheck = () => {
    if (dropdown) {
      enableDropdown(false);
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".modal-content")) {
      onClose();
    }
  };

  const handleItemClick = (fileName, index) => {
    const encodedFileName = encodeURIComponent(fileName); // Encode special characters in the file name
    const filePath = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/${encodedFileName}`;
    setCurrentSong(filePath);
    setCurrentCover(
      `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`
    );
    setCurrentFolder(folderName);

    console.log("Current Folder:" + currentFolder);
    console.log("Current Track:" + currentSong);
    //console.log(currentCover); DEBUGGING
    setCurrentSongIndex(index);
  };

  const bind = useGesture({
    onDragEnd: (state) => {
      if (state.down && state.movement[1] > 100) {
        onClose(); // Close the modal if swiped down by at least 100px
      }
    },
  });
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const downloadLink = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}`;
  return (
    <div>
      <Player setCurrentSong={setCurrentSong} currentFolder={currentFolder} />
      <div className="w-full h-full">
        <Backdrop />
      </div>
      <motion.div
        {...bind()}
        initial={{
          scale: isLargeScreen ? 0 : 1,
          y: isLargeScreen ? 0 : "100%",
        }}
        animate={{ scale: 1, y: isLargeScreen ? 0 : 0 }}
        exit={{ scale: isLargeScreen ? 0 : 1, y: isLargeScreen ? 0 : "100%" }}
        transition={{ type: "spring", duration: 0.4 }}
        className="md:inset-0  md:flex   md:items-center no_transition md:justify-center md:fixed absolute   md:-mt-10 top-0 left-0 w-full h-full z-50 pt-14"
        onClick={handleClickOutside}
      >
        <div
          onClick={dropdownModalCheck}
          id="modal"
          className={`p-4 md:p-8 pt-6 md:rounded-lg shadow-lg modal-content md:dark:bg-opacity-5 bg-white md:bg-opacity-20 md:min-h-fit min-h-[500%] backdrop-blur-xl md:backdrop-blur-3xl z-50 
          ${
            isLargeScreen
              ? ""
              : "bg-white  dark:bg-black bg-opacity-0 dark:bg-opacity-0 text-black dark:text-white dark:from-black dark:to-transparent bg-gradient-to-b from-white to-gray-600 "
          }
          `}
        >
          <div className="flex flex-col   items-center md:hidden ">
            {" "}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="-mt-5 py-1 no_transition z-0"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-fold-down stroke-slate-200 dark:stroke-slate-600 dark:hover:stroke-blue-500 hover:stroke-blue-500 cursor-pointer"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 11v8l3 -3m-6 0l3 3" />
                <path d="M9 7l1 0" />
                <path d="M14 7l1 0" />
                <path d="M19 7l1 0" />
                <path d="M4 7l1 0" />
              </svg>
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-20 text-white right-0 no_transition z-[10000000] ${
                folderContents.length > 10 ? "" : "hidden"
              }`}
              onClick={onClose}
            >
              X
            </motion.button>
            {/* image optimization doesnt work with automatic height nad width */}
            <img
              src={`https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`}
              alt="Icon"
              className="h-auto w-auto max-h-fit my-6 shadow-md rounded-[20px]"
            />
          </div>

          <div className="flex">
            <h2 className="font-bold mb-2 md:text-4xl text-2xl dark:text-white md:text-white">
              {tidyAlbumName(folderName)}
            </h2>{" "}
            <div
              className={`group border dark:border-white md:border-white border-black max-w-fit h-6 md:mt-[9.5px] ${
                dropdown ? "dark:bg-white bg-slate-400 " : ""
              } ${
                spotifyLink ? "" : "hidden"
              } rounded-full border-2 mt-[2px] ml-2`}
              onClick={dropdownList}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={`icon icon-tabler icon-tabler-dots ${
                  dropdown
                    ? "dark:stroke-black stroke-white  md:stroke-white"
                    : "dark:stroke-white rounded-full md:stroke-white"
                } cursor-pointer max-h-fit`}
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
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              </svg>
              <AnimatePresence>
                {dropdown && (
                  <motion.ul
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2, type: "spring" }}
                    className="absolute mt-2 bg-white dark:bg-black dark:border-slate-500 border  rounded-lg z-[1000] no_transition"
                  >
                    {spotifyLink && (
                      <li className="hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg px-2">
                        <a
                          target="_blank"
                          href={spotifyLink}
                          className=" flex max-w-fit py-1 h-8"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-brand-spotify stroke-black dark:stroke-white group:stroke-green-500 -mt-[2px]"
                            width="30"
                            height="30"
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
                          <label className="mx-1 mt-[3px] dark:text-white text-black cursor-pointer ">
                            Spotify
                          </label>
                        </a>
                      </li>
                    )}
                    {appleMusicLink && (
                      <li className="hover:bg-gray-300 dark:hover:bg-slate-700 px-2 rounded-lg  cursor-pointer">
                        <a
                          target="_blank"
                          href={appleMusicLink}
                          className="flex max-w-fit rounded-full mt-[4px] cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-brand-apple dark:stroke-white stroke-black"
                            width="30"
                            height="30"
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

                          <label className="mx-1 mt-[2px] py-1 dark:text-white text-black cursor-pointer">
                            Apple
                          </label>
                        </a>
                      </li>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
          <h1 className="dark:text-gray-300 md:text-white text-slate-600 font-extrabold md:text-base text-sm">
            {yearReleased}
          </h1>
          <div className="md:flex grid grid-flow-row">
            <h1 className="dark:text-slate-400 md:text-white text-slate-600 max-w-[28rem] md:text-base text-sm py-2">
              {albumDescription}
            </h1>
          </div>

          <div className="border-b border-gray-500 md:border-gray-500 dark:md:border-gray-500  pb-2 border-opacity-50 md:flex gap-3 md:text-base text-sm">
            {artistChoice && (
              <h1 className="text-yellow-500 dark:text-yellow-300  border-2 border-yellow-500 max-w-fit px-3 rounded-full my-2">
                Artist&apos;s Choice:{" "}
                <span className="font-extrabold">{artistChoice}</span>
              </h1>
            )}
            {websiteExclusive && (
              <h1 className="md:text-green-400 text-green-500 border-green-500 border-2 md:border-green-400  max-w-fit px-3 my-2 rounded-full">
                <span className="font-extrabold md:text-base text-sm">
                  Website Exclusive
                </span>
              </h1>
            )}
            {youtubeLink && (
              <a
                target="_blank"
                href={youtubeLink}
                className="text-red-500 border-2 border-red-500 my-2  max-w-fit px-3 rounded-full flex"
              >
                <span className="font-extrabold md:text-base text-sm">
                  Youtube
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-arrow-up-right stroke-red-500 md:mt-[2.2px]"
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
                  <path d="M17 7l-10 10" />
                  <path d="M8 7l9 0l0 9" />
                </svg>
              </a>
            )}
            {inspirationLink && (
              <a
                target="_blank"
                href={inspirationLink}
                className="text-blue-600 flex border-2 border-blue-600  max-w-fit px-3 my-2 rounded-full"
              >
                <span className="font-extrabold md:text-base text-sm">
                  {" "}
                  Inspiration
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-arrow-up-right stroke-blue-600 md:mt-[2px]"
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
                  <path d="M17 7l-10 10" />
                  <path d="M8 7l9 0l0 9" />
                </svg>
              </a>
            )}
          </div>
          <ul
            className={`pt-3 pb-[30%] md:pb-0 grid grid-cols-1 ${
              folderContents.length > 4 ? "md:grid-cols-2 gap-2" : "gap-4"
            } ${folderContents.length > 10 ? "md:grid-cols-3" : ""} `}
          >
            {folderContents.map((item, index) => (
              <li
                key={index}
                className="flex items-center group dark:text-white md:text-base text-sm space-x-4 py-2 md:py-2 px-2 hover:bg-blue-500 rounded-md hover:scale-105 active:scale-95 transition-all duration-400 cursor-pointer"
                onClick={() => handleItemClick(item.name, index)}
              >
                {index === currentSongIndex && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="min-w-4 min-h-4 transition-all rounded-full bg-blue-300 animate-pulse"
                  ></motion.div>
                )}

                <Image
                  src={`https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`}
                  alt="Icon"
                  className="md:h-14 rounded-lg md:w-14 h-14 w-14" // Increase image size as needed
                  width={56}
                  height={56}
                />
                <div className="flex w-full items-center justify-between">
                  <div className="min-w-fit">
                    <h3 className="dark:text-white md:text-white">
                      {tidyFileName(item.name)}
                    </h3>
                    <p className="text-slate-600 md:text-slate-400 dark:text-slate-400">
                      {artist}
                    </p>

                    {item.name === artistChoice && (
                      <h1 className="text-yellow-300">Artist&apos;s Choice</h1>
                    )}
                  </div>
                  {/* <div> ----- download button disabled
                    <motion.button>
                      <a href={currentSong}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-download stroke-gray-500 hover:bg-white rounded-full"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#000000"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                          <path d="M7 11l5 5l5 -5" />
                          <path d="M12 4l0 12" />
                        </svg>
                      </a>
                    </motion.button>
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;

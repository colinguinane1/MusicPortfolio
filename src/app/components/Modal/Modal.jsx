// Modal.jsx
import React, { useState, useEffect } from "react";
import { motion, spring } from "framer-motion";
import Player from "../Player";
import Backdrop from "./Backdrop";
import { useMediaQuery } from "@react-hook/media-query";
import { useGesture } from "react-use-gesture";
import { Island_Moments, Playball } from "next/font/google";

const Modal = ({
  playButtonPressed,
  folderName,
  isPlaying,
  folderContents,
  tidyFileName,
  onClose,
  setCurrentSong,
  handlePlay, // Receive handlePlay as a prop
  albumDescription,
  yearReleased,
  spotifyLink,
  appleMusicLink,
  artistChoice,
  websiteExclusive,
  youtubeLink,
}) => {
  const artist = "Colin Guinane";
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [dropdown, enableDropdown] = useState(false);
  const [dominantColors, setDominantColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const imageUrl = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`;
        const colors = await extractColors(imageUrl);
        setDominantColors(colors);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    fetchColors();
  }, [folderName]);

  const modalStyle = {
    backgroundColor: dominantColors[0], // Use the first dominant color as the background color
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
    setCurrentSongIndex(index);
    playButtonPressed = true;
  };

  const bind = useGesture({
    onDragEnd: (state) => {
      if (state.down && state.movement[1] > 100) {
        onClose(); // Close the modal if swiped down by at least 100px
      }
    },
  });

  console.log(playButtonPressed);

  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const downloadLink = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}`;

  return (
    <div>
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
        transition={{ type: isLargeScreen ? spring : "tween", duration: 0.3 }}
        style={modalStyle}
        className="md:inset-0 md:flex md:items-center md:justify-center md:fixed absolute top-0 left-0 w-full h-full z-50"
        onClick={handleClickOutside}
      >
        <div
          onClick={dropdownModalCheck}
          id="modal"
          className={`p-8 rounded-lg shadow-lg modal-content md:min-h-fit min-h-[200%] backdrop-blur-3xl z-50 ${
            isLargeScreen ? "" : "gradient"
          } ${playButtonPressed ? "" : ""}`}
        >
          <div className="flex flex-col items-center md:hidden">
            <img
              src={`https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`}
              alt="Icon"
              className="h-2/3 w-2/3 px-2 py-6"
            />
          </div>
          <span
            className="absolute right-0 p-2 mt-0 top-0  cursor-pointer"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="md:hidden icon icon-tabler icon-tabler-circle-x stroke-white hover:stroke-red-500 hover:scale-105 active:scale-95"
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
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </span>
          <div className="flex">
            <h2 className="font-bold mb-4 text-4xl text-white">{folderName}</h2>{" "}
            <div
              className={`group border max-w-fit h-8 ${
                dropdown ? "bg-white" : ""
              } ${spotifyLink ? "" : "hidden"} rounded-full border-2 mt-1 ml-5`}
              onClick={dropdownList}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={`icon icon-tabler icon-tabler-dots ${
                  dropdown ? "stroke-black" : "stroke-white"
                } cursor-pointer max-h-fit`}
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
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              </svg>

              {dropdown && (
                <motion.ul
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, type: spring }}
                  className="absolute mt-2 -ml-[6.5rem] bg-white px-3 rounded-lg z-[1000] no_transition"
                >
                  {spotifyLink && (
                    <li className="border-b border-black">
                      <a
                        href={spotifyLink}
                        className=" flex max-w-fit mt-2  h-8"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-brand-spotify stroke-black group:stroke-green-500 -mt-[2px]"
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
                        <label className="mx-1 mt-[3px] cursor-pointer">
                          Spotify
                        </label>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-arrow-up-right stroke-black mt-[6px]"
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
                    </li>
                  )}
                  {appleMusicLink && (
                    <li className="flex py-[2px] cursor-pointer">
                      <a
                        href={appleMusicLink}
                        className="flex max-w-fit rounded-full mt-[4px] cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-brand-apple stroke-black"
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

                        <label className="mx-1 mt-[2px] py-1 cursor-pointer">
                          Apple
                        </label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-arrow-up-right stroke-black mt-[7px]"
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
                    </li>
                  )}
                </motion.ul>
              )}
            </div>
          </div>
          <h1 className="text-gray-300 font-extrabol">{yearReleased}</h1>
          <div className="md:flex grid grid-flow-row">
            <h1 className="text-white max-w-[28rem] py-2">
              {albumDescription}
            </h1>
          </div>

          <div className="border-b border-gray-500 pb-2 border-opacity-50 md:flex gap-3">
            {artistChoice && (
              <h1 className="text-yellow-300 border-2 border-yellow-600 max-w-fit px-3 rounded-full my-2">
                Artist&apos;s Choice:{" "}
                <span className="font-extrabold">{artistChoice}</span>
              </h1>
            )}
            {websiteExclusive && (
              <h1 className="text-green-400 border-2 border-green-600  max-w-fit px-3 rounded-full my-2">
                <span className="font-extrabold">Website Exclusive</span>
              </h1>
            )}
            {youtubeLink && (
              <a
                href={youtubeLink}
                className="text-red-500 border-2 border-red-800  max-w-fit px-3 rounded-full my-2 flex"
              >
                <span className="font-extrabold">Youtube</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-arrow-up-right stroke-red-800 ml-1 mt-[1px]"
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
            className={`pt-3 pb-[10%] md:pb-0 grid grid-cols-1 ${
              folderContents.length > 4 ? "md:grid-cols-2" : ""
            } gap-4`}
          >
            {folderContents.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-white space-x-4 py-2 px-2 hover:bg-blue-500 rounded-md hover:scale-105 active:scale-95 transition-all duration-400 cursor-pointer"
                onClick={() => handleItemClick(item.name, index)}
              >
                {index === currentSongIndex && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full bg-blue-300 animate-pulse"
                  ></motion.div>
                )}
                <img
                  src={`https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`}
                  alt="Icon"
                  className="h-16 w-16" // Increase image size as needed
                />
                <div className="min-w-fit">
                  <h3 className="">{tidyFileName(item.name)}</h3>
                  <p className="text-gray-400">{artist}</p>
                  {item.name === artistChoice && (
                    <h1 className="text-yellow-300">Artist&apos;s Choice</h1>
                  )}
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

"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal/Modal";
import Image from "next/image";
import { useMediaQuery } from "@react-hook/media-query";

const Player = memo(
  ({
    currentSong,
    currentFolder,

    setCurrentSong,
    currentCover,
    coverUrl,
    isModalOpen,
    folderName,

    songs,
  }) => {
    const audioRef = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const isLargeScreen = useMediaQuery("(min-width: 768px)");
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [prevSong, setPrevSong] = useState(null);

    const [bigPlayer, enableBigPlayer] = useState(false);
    const [volume, setVolume] = useState(50); // Step 1: Volume state with initial value
    const [showVolSlider, setShowVolSlider] = useState(false);
    const [songStopped, setSongStopped] = useState(false);

    const playerToggle = () => {
      enableBigPlayer(!bigPlayer);
      console.log(playerToggle);
    };

    const tidyAlbumName = (folderName) => {
      // Remove leading numbers followed by a dot and trim any spaces
      return folderName.replace(/^\d+\./, "").trim();
    };

    const toggleVolumeSlider = () => {
      setShowVolSlider(!showVolSlider);
    };

    const handleVolumeChange = (e) => {
      // Step 2: Function to handle volume change
      const newVolume = e.target.value;
      setVolume(newVolume);
      audioRef.current.volume = newVolume / 100;
    };

    const artist = "Colin Guinane";

    const tidyFileName = (fileName) => {
      if (fileName !== "null") {
        const decodedFileName = decodeURIComponent(fileName); // Decode URL-encoded string
        const parts = decodedFileName.split("/");
        let name = parts[parts.length - 1];
        // Remove the prefix "1\" from the track name
        name = name.replace(/^\d+\\/, "");
        return name.replace(/\.[^.]+$/, "");
      } else {
        console.error("File name is null");
        return "Unknown"; // Return a placeholder value or handle the null case appropriately
      }
    };

    useEffect(() => {
      const audio = audioRef.current;

      audio.src = currentSong;

      const handleTimeUpdate = () => {
        const remaining = audio.duration - audio.currentTime;
        const elapsed = audio.currentTime;
        setRemainingTime(remaining);
        setElapsedTime(elapsed);
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleSongEnd);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Playback error:", error);
        });
      } else {
        audio.pause();
      }

      return () => {
        audio.pause();
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleSongEnd);
      };
    }, [currentSong, isPlaying]);

    const handleSongEnd = () => {
      // Move to the next song
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        // If it's the last song, stop playing
        setIsPlaying(false);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      // setSongStopped(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleStop = () => {
      setIsPlaying(false);
      // setSongStopped(true);
      audioRef.current.currentTime = 0;
    };

    const handleSeek = (e) => {
      const seekTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = seekTime;
    };

    const add10sec = () => {
      audioRef.current.currentTime += 10;
    };

    const remove10sec = () => {
      audioRef.current.currentTime -= 10;
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
      // Update previous song when currentSong changes
      setPrevSong(currentSong);
    }, [currentSong]);

    return (
      <AnimatePresence>
        {currentSong && (
          <motion.div className={``}>
            {!songStopped && (
              <motion.div
                initial={{ y: 100 }}
                animate={
                  isLargeScreen ? { scale: 1, y: 0 } : { scale: 0.92, y: 0 }
                }
                exit={{ scale: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="fixed md:rounded-none no_transition md:mb-0 mb-8 bottom-0 bg dark:bg-black dark:bg-opacity-20 bg-white bg-opacity-10 shadow-lg  w-full backdrop-blur-3xl md:scale-100 scale-[0.92] rounded-lg h-20 flex justify-center items-center z-[100]"
              >
                <main className="flex mx-2 items-center z-10">
                  {isPlaying && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="min-w-4 min-h-4  flex flex-col justify-center items-center rounded-full bg-blue-500 animate-pulse"
                    ></motion.div>
                  )}
                  <img
                    src={currentCover}
                    alt="Album Cover"
                    className="w-12 h-12 hover:border hover:shadow-2xl rounded-md mx-4 cursor-pointer"
                    width={48}
                    height={48}
                    onClick={playerToggle}
                  />
                  <div
                    onclick={playerToggle}
                    className="min-w-fit md:text-base text-sm"
                  >
                    <h1
                      className={`dark:text-white md:text-white font-bold ${
                        isModalOpen ? "text-black" : "text-white"
                      }  `}
                    >
                      {tidyFileName(currentSong)}
                    </h1>
                    <h1
                      className={`dark:text-white md:text-white ${
                        isModalOpen ? "text-gray-800" : "text-gray-300"
                      }  `}
                    >
                      {artist}
                    </h1>
                  </div>
                </main>
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pt-[67px] no_transition md:mt-[-149px] absolute"
                    >
                      {" "}
                      {/* {nice} */}
                      <input
                        type="range"
                        id="songDuration"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                        className="w-full max-h-fit bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300 z-0"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isPlaying && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`icon icon-tabler icon-tabler-player-play-filled   rounded-full p-2  hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100] ${
                      isModalOpen
                        ? "stroke-black md:stroke-white dark:stroke-white"
                        : "stroke-white"
                    }`}
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={handlePlay}
                  >
                    <path d="M5 3l14 9l-14 9z" />
                  </svg>
                )}
                {isPlaying && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`icon icon-tabler icon-tabler-player-pause-filled    rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100] ${
                      isModalOpen
                        ? "stroke-black md:stroke-white dark:stroke-white"
                        : "stroke-white"
                    }`}
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={handlePause}
                  >
                    <path d="M6 4h4v16h-4zm8 0h4v16h-4z" />
                  </svg>
                )}
                {/* <svg         ----------      button disabled as it doesnt really do anything
                  xmlns="http://www.w3.org/2000/svg"
                  className={`icon icon-tabler icon-tabler-player-stop-filled mx-4   rounded-full p-2 hover:stroke-blue-400 hover:scale-105 active:scale-95 cursor-pointer z-[100] ${
                    isModalOpen
                      ? "stroke-black md:stroke-white dark:stroke-white"
                      : "stroke-white"
                  }`}
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={handleStop}
                >
                  <path d="M6 6h12v12H6z" />
                </svg> */}
                <div className="md:block hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-volume  stroke-white rounded-full p-2 hover:stroke-blue-400 hover:scale-105 active:scale-95 cursor-pointer z-[100]"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    onClick={toggleVolumeSlider}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 8a5 5 0 0 1 0 8" />
                    <path d="M17.7 5a9 9 0 0 1 0 14" />
                    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                  </svg>
                  {showVolSlider && (
                    <div className="absolute -mt-[74px]">
                      <input
                        id="volumeSlider"
                        type="range"
                        min="0"
                        max="100"
                        value={volume} // Assuming you have a volume state
                        onChange={handleVolumeChange} // Assuming you have a function to handle volume change
                        className="h-full rounded-full -rotate-90 bg-gray-200 appearance-none cursor-pointer dark:bg-gray-300 z-0"
                      />
                    </div>
                  )}
                </div>

                {isPlaying && ( //DISABLED UNLESS IN BIG PLAYER / MEDIUM SCREEN SIZE - I THINK THAT LOOKS BETTER
                  <h1
                    className={`items-center text-sm ml-2 ${
                      isModalOpen
                        ? "text-black dark:text-white md:text-white"
                        : "text-white"
                    }`}
                  >
                    {remainingTime != 0 && formatTime(remainingTime)}
                  </h1>
                )}
              </motion.div>
            )}
            <AnimatePresence>
              {bigPlayer && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  exit={{ y: "100%" }}
                  className="fixed z-[1000] flex justify-center dark:bg-black bg-white bg-opacity-50 bg-gradient-to-b from-white dark:from-black to-transparent  backdrop-blur-xl dark:bg-opacity-10 w-full h-full top-0 no_transition"
                >
                  <div className="flex flex-col justify-center mx-4 items-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={playerToggle}
                      className="no_transition z-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-fold-down  dark:stroke-white dark:hover:stroke-blue-500 hover:stroke-blue-500 cursor-pointer"
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
                    <div className="">
                      {/* image optimization doesn't seem to work with percentages */}
                      <img
                        src={currentCover}
                        alt="Album Cover"
                        className=" w-full max-w-[24.5rem] rounded-lg  shadow-2xl h-auto md:mt-12 mx-auto my-6"
                      />
                      <div className="md:text-base text-sm">
                        <h1 className="text-2xl pr-4 dark:text-white font-extrabold">
                          {/* {tidyFileName(currentFolder)} */}
                          <span className="text-2xl my-1 flex items-center mr-4">
                            {tidyFileName(currentSong)}{" "}
                            {isPlaying && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="min-w-2 ml-2 max-w-2 max-h-2 min-h-2  flex flex-col justify-center items-center rounded-full bg-blue-500 animate-pulse"
                              ></motion.div>
                            )}
                          </span>
                        </h1>

                        <h1 className="text-gray-800 ">{artist}</h1>
                      </div>
                      <div className="">
                        <div className="flex       mt-6  ">
                          <input
                            id="songDuration"
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="cursor-pointer px-2 max-w-[22rem] md:max-w-full"
                          />{" "}
                        </div>
                        <div className="flex justify-between max-w-[24rem] mt-6 w-full">
                          {" "}
                          <h1 className="dark:text-white -mt-4   text-black text-xs mx-2">
                            {elapsedTime != 0 && formatTime(elapsedTime)}
                          </h1>
                          <h1 className="dark:text-white -mt-4  text-black text-xs mx-2">
                            {remainingTime != 0 && formatTime(remainingTime)}
                          </h1>
                        </div>
                        <div className="flex items-center pt-4 md:pt-0 md:my-2 justify-center    my-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-rewind-backward-10 dark:stroke-white stroke-black  rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#000000"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            onClick={remove10sec}
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 9l-3 -3l3 -3" />
                            <path d="M15.997 17.918a6.002 6.002 0 0 0 -.997 -11.918h-11" />
                            <path d="M6 14v6" />
                            <path d="M9 15.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0z" />
                          </svg>
                          {!isPlaying && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-player-play-filled dark:stroke-white stroke-black rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
                              width="50"
                              height="50"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              onClick={handlePlay}
                            >
                              <path d="M5 3l14 9l-14 9z" />
                            </svg>
                          )}
                          {isPlaying && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-player-pause-filled dark:stroke-white stroke-black  rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
                              width="50"
                              height="50"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              onClick={handlePause}
                            >
                              <path d="M6 4h4v16h-4zm8 0h4v16h-4z" />
                            </svg>
                          )}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-player-stop-filled mx-2 dark:stroke-white stroke-black rounded-full p-2 hover:stroke-blue-400 hover:scale-105 active:scale-95 cursor-pointer z-[100]"
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#2c3e50"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={handleStop}
                          >
                            <path d="M6 6h12v12H6z" />
                          </svg>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-rewind-forward-10 dark:stroke-white stroke-black  rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#000000"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            onClick={add10sec}
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M17 9l3 -3l-3 -3" />
                            <path d="M8 17.918a5.997 5.997 0 0 1 -5 -5.918a6 6 0 0 1 6 -6h11" />
                            <path d="M12 14v6" />
                            <path d="M15 15.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Player.displayName = "Player";

export default Player;

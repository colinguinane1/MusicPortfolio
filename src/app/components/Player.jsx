"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal/Modal";
import Image from "next/image";
import { useMediaQuery } from "@react-hook/media-query";

const Player = memo(
  ({
    currentSong,

    setCurrentSong,
    currentCover,
    coverUrl,
    isModalOpen,
    songs,
  }) => {
    const audioRef = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const isLargeScreen = useMediaQuery("(min-width: 768px)");
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
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
        setRemainingTime(remaining);
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
                    className="w-12 h-12 rounded-md mx-4 cursor-pointer"
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
                    className={`items-center text-sm ml-4 ${
                      isModalOpen ? "text-black" : "text-white"
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
                  className="fixed z-[1000] flex justify-center items-center w-full h-full top-0 no_transition"
                >
                  <div className="backdrop-blur-xl bg-black bg-opacity-50 w-full h-full flex text-center justify-center items-center">
                    <button
                      onClick={playerToggle}
                      className="absolute top-2 right-2"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-circle-x stroke-white hover:stroke-red-500 hover:scale-105 active:scale-95"
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
                    </button>
                    <div className="">
                      {/* image optimization doesn't seem to work with percentages */}
                      <img
                        src={currentCover}
                        alt="Album Cover"
                        className="w-[80%] md:w-[80%] max-w-[600px] rounded-lg  shadow-2xl h-auto md:mt-12 mx-auto my-6"
                      />
                      <div className="md:text-base text-sm">
                        <h1 className="text-white font-bold">
                          {tidyFileName(currentSong)}
                        </h1>
                        <h1 className="text-gray-400 ">{artist}</h1>
                      </div>
                      <div className="">
                        <div className="flex justify-center  my-8 ml-2 items-center">
                          <input
                            id="songDuration"
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="max-w-[75%] cursor-pointer"
                          />
                          <h1 className="text-white text-xs mx-2">
                            {remainingTime != 0 && formatTime(remainingTime)}
                          </h1>
                        </div>
                        <div className="flex items-center justify-center my-4">
                          {!isPlaying && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-player-play-filled stroke-black rounded-full p-2 bg-white hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
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
                              className="icon icon-tabler icon-tabler-player-pause-filled stroke-black bg-white rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
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
                            className="icon icon-tabler icon-tabler-player-stop-filled mx-2 stroke-black bg-white rounded-full p-2 hover:stroke-blue-400 hover:scale-105 active:scale-95 cursor-pointer z-[100]"
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

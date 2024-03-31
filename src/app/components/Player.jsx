"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal/Modal";

const Player = memo(({ currentSong, coverUrl }) => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [prevSong, setPrevSong] = useState(null);
  const [bigPlayer, enableBigPlayer] = useState(false);
  let playButtonPressed = false;

  const playerToggle = () => {
    enableBigPlayer(!bigPlayer);
    console.log(playerToggle);
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
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Playback error:", error);
        playButtonPressed = true;
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentSong, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    playButtonPressed = true;
    console.log(playButtonPressed);
    return <audio ref={audioRef}></audio>;
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
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
    currentSong && (
      <motion.div
        key="player"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={`flex flex-col items-center scale-1 ${
          currentSong ? "" : ""
        }`}
      >
        <div className="fixed md:ml-2 md:mb-0 mb-8 bottom-0 bg shadow-lg-transparent md:w-full w-[26rem] backdrop-blur-3xl md:scale-100 scale-90 px-6 rounded-lg h-20 flex justify-center items-center z-[1000]">
          <main className="flex mx-6 -ml-6 z-10">
            <img
              src={coverUrl}
              alt="Album Cover"
              className="w-12 h-12 rounded-md mx-6 cursor-pointer"
              onClick={playerToggle}
            />
            <div className="">
              <h1 className="text-white">{tidyFileName(currentSong)}</h1>
              <h1 className="text-gray-400">{artist}</h1>
            </div>
          </main>
          <audio ref={audioRef}></audio>
          {isPlaying && (
            <div className="pt-[67px] md:mt-[-148px] absolute">
              {" "}
              {/* {nice} */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full max-h-fit bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300 z-0"
              />
            </div>
          )}
          {!isPlaying && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-player-play-filled stroke-black rounded-full p-2 bg-white hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
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
              className="icon icon-tabler icon-tabler-player-pause-filled stroke-black bg-white rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400 z-[100]"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-player-stop-filled mx-4 stroke-black bg-white rounded-full p-2 hover:stroke-blue-400 hover:scale-105 active:scale-95 cursor-pointer z-[100]"
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
          </svg>{" "}
          {isPlaying && (
            <h1 className="text-white">
              {remainingTime != 0 && formatTime(remainingTime)}
            </h1>
          )}
        </div>
        {bigPlayer && (
          <div className="fixed z-[1000] flex justify-center items-center w-full h-full top-0">
            <div className="backdrop-blur-3xl w-full h-full flex justify-center items-center">
              <button onClick={playerToggle} className="absolute top-2 right-2">
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
              <div className="text-center">
                <img
                  src={coverUrl}
                  alt="Album Cover"
                  className="w-[80%] md:w-[80%] h-auto md:mt-12 mx-auto my-6"
                />
                <div className="text-left ml-12">
                  <h1 className="text-white">{tidyFileName(currentSong)}</h1>
                  <h1 className="text-gray-400">{artist}</h1>
                </div>
                <div className="">
                  <div className="flex justify-center my-3 items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleSeek}
                      className="max-w-[65%] cursor-pointer"
                    />
                    <h1 className="text-white px-3">
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
                      className="icon icon-tabler icon-tabler-player-stop-filled mx-4 stroke-black bg-white rounded-full p-2 hover:stroke-blue-400 hover:scale-105 active:scale-95 cursor-pointer z-[100]"
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
                    </svg>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    )
  );
});

Player.displayName = "Player";

export default Player;

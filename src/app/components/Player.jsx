"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal/Modal";

const Player = memo(({ currentSong, coverUrl }) => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [prevSong, setPrevSong] = useState(null);
  const [bigPlayer, enableBigPlayer] = useState(false);

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
      <motion.main>
        <div className="flex flex-col items-center mt-10">
          <div className="fixed md:ml-2 bottom-0 bg-transparent backdrop-blur-3xl md:scale-100 scale-90 px-6 rounded-lg w-full h-20 flex justify-center items-center z-[1000]">
            <main className="flex mx-6 -ml-6">
              <img
                src={coverUrl}
                alt="Album Cover"
                className="w-10 h-10 rounded-md mx-6 cursor-pointer"
                onClick={playerToggle}
              />
              <div className="hidden md:block">
                <h1 className="text-white">{tidyFileName(currentSong)}</h1>
                <h1 className="text-gray-400">{artist}</h1>
              </div>
            </main>
            <audio ref={audioRef}></audio>
            {isPlaying && (
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="mx-10"
              />
            )}
            {!isPlaying && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-player-play-filled mx-4 stroke-white hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400"
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
                className="icon icon-tabler icon-tabler-player-pause-filled mx-4 stroke-white hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400"
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
              className="icon icon-tabler icon-tabler-player-stop-filled mx-4 stroke-white"
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
                <div className="grid">
                  <img
                    src={coverUrl}
                    alt="Album Cover"
                    className="-mt-60 scale-125 rounded-md mx-10 my-10"
                  />
                  <div className="block">
                    <h1 className="text-white">{tidyFileName(currentSong)}</h1>
                    <h1 className="text-gray-400">{artist}</h1>
                  </div>
                  <div className="flex">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleSeek}
                      className="mx-10"
                    />
                    <h1 className="text-white">
                      {remainingTime != 0 && formatTime(remainingTime)}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.main>
    )
  );
});

Player.displayName = "Player";

export default Player;

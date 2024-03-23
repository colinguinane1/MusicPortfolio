"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const [audio] = useState(new Audio());

  useEffect(() => {
    if (currentSong) {
      audio.src = currentSong;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [currentSong, isPlaying, audio]);

  const getSongNameFromUrl = (url) => {
    if (!url) return ""; // Return empty string if URL is undefined
    // Split the URL by '/' and get the last part (i.e., the song name)
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const handlePlay = () => {
    if (currentSong) {
      const audio = new Audio(currentSong);
      audio.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (currentSong) {
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    // Add code to stop the current song
  };
  //   console.log(getSongNameFromUrl(currentSong));
  console.log("Current Song in Player:", currentSong);

  return (
    <div className="flex flex-col items-center">
      <div className="fixed bottom-0 bg-white w-full h-20 flex justify-center items-center">
        <h1></h1>
        {/* Display song name extracted from URL */}
        {/* Ensure that currentSong is rendered */}
        {/* {play button} */}
        {!isPlaying && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-player-play-filled mx-4 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400"
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
        {/* {pause button} */}
        {isPlaying && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-player-pause-filled mx-4 hover:scale-105 active:scale-95 cursor-pointer hover:stroke-blue-400"
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
        {/* {stop button} */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-player-stop-filled mx-4"
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
        </svg>
      </div>
    </div>
  );
};

export default Player;

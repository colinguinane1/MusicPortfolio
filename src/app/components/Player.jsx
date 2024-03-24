"use client";
import React, { useState, useEffect, useRef, memo } from "react";

const Player = memo(function Player({ currentSong, coverUrl }) {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const artist = "Colin Guinane";

  const tidyFileName = (fileName) => {
    const parts = fileName.split("/");
    const name = parts[parts.length - 1];
    return name.replace(/\.[^.]+$/, "");
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.src = currentSong;

    const handleTimeUpdate = () => {
      const remaining = audio.duration - audio.currentTime;
      setRemainingTime(remaining);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

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
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {};

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="fixed bottom-0 bg-transparent backdrop-blur-md w-full h-20 flex justify-center items-center z-[1000]">
        <img
          src={coverUrl}
          alt="Album Cover"
          className="w-10 h-10 rounded-md mx-6"
        />
        <div>
          <h1 className="text-white font-bold">{tidyFileName(currentSong)}</h1>
          <h1 className="text-gray-500">{artist}</h1>
        </div>
        <audio ref={audioRef}></audio>
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
        </svg>{" "}
        <h1 className="text-gray-500">
          {remainingTime && formatTime(remainingTime)}
        </h1>
      </div>
    </div>
  );
});

Player.displayName = "Player";

export default Player;

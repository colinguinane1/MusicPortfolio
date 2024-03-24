"use client";
import React, { useState, useEffect, useRef, memo } from "react";

const Player = memo(({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(new Audio()); // Create audio element using useRef
  const [error, setError] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleError = (errorEvent) => {
      console.error("Audio playback error:", errorEvent.target.error);
      setError(errorEvent.target.error);
    };

    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    // Update the audio source when currentSong changes
    audio.src = currentSong;

    // Play or pause based on isPlaying
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Playback error:", error);
        setError(error);
      });
    } else {
      audio.pause();
    }

    return () => {
      // Cleanup audio when unmounting
      audio.pause();
      audio.src = "";
    };
  }, [currentSong, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="fixed bottom-0 bg-transparent backdrop-blur-md  w-full h-20 flex justify-center items-center z-[1000]">
        <audio src={currentSong} controls></audio>
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
        </svg>
      </div>
    </div>
  );
});

export default Player;

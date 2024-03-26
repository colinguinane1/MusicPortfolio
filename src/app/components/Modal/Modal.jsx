import React, { useState } from "react";
import { motion, spring } from "framer-motion";

const Modal = ({
  folderName,
  folderContents,
  tidyFileName,
  onClose,
  setCurrentSong,
  currentSong,
  handlePlay,
}) => {
  const artist = "Colin Guinane";
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  const handleClickOutside = (event) => {
    // Check if the click occurred outside the modal content
    if (!event.target.closest(".modal-content")) {
      onClose(); // Close the modal
    }
  };

  const handleItemClick = (fileName, index) => {
    const filePath = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/${fileName}`;
    setCurrentSong(filePath); // Update the current song
    setCurrentSongIndex(index); // Update the current song index
    handlePlay(); // Start playing the selected song
  };

  const artistChoicesNames = ["Rust", "AnotherArtistChoiceSong"];

  const checkName = (fileName) => {
    if (artistChoicesNames.includes(fileName)) {
      return <h1>Artists Choice</h1>;
    }
    return null;
  };

  return (
    <div className="bg-transparent backdrop-blur-sm w-screen h-full absolute top-0">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: spring, duration: 0.3 }}
        className="inset-0 flex items-center justify-center overflow-y-auto fixed"
        onClick={handleClickOutside}
      >
        <div className="p-8 rounded shadow-md modal-content scale-75 md:scale-100 z-50 background-transparent backdrop-blur-3xl">
          <span
            className="absolute right-0 p-2 cursor-pointer"
            onClick={onClose}
          >
            &times;
          </span>
          <h2 className="font-bold mb-4 text-4xl text-white">{folderName}</h2>
          <ul className={`grid grid-cols-2 md:grid-cols-1 gap-4`}>
            {folderContents.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-white space-x-4 py-2 px-2 hover:bg-blue-500 rounded-md hover:scale-105 active:scale-95 transition-all duration-400 cursor-pointer text-[12px] md:text-base"
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
                <div>
                  <h3 className="">{tidyFileName(item.name)}</h3>
                  <p className="text-gray-400">{artist}</p>
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

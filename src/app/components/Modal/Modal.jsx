// Modal.jsx
import React, { useState } from "react";
import { motion, spring } from "framer-motion";
import Player from "../Player";

const Modal = ({
  folderName,
  folderContents,
  tidyFileName,
  onClose,
  setCurrentSong,
  handlePlay, // Receive handlePlay as a prop
  albumDescription,
  yearReleased,
  spotifyLink,
  appleMusicLink,
}) => {
  const artist = "Colin Guinane";
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".modal-content")) {
      onClose();
    }
  };

  const handleItemClick = (fileName, index) => {
    const filePath = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/${fileName}`;
    setCurrentSong(filePath);
    setCurrentSongIndex(index);
    handlePlay(); // Call handlePlay to start playback
  };

  const artistChoicesNames = ["Rust", "AnotherArtistChoiceSong"];

  const checkName = (fileName) => {
    if (artistChoicesNames.includes(fileName)) {
      return <h1>Artists Choice</h1>;
    }
    return null;
  };

  return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: spring, duration: 0.3 }}
        className="md:inset-0 md:flex md:items-center md:justify-center md:fixed absolute max-w-full min-w-full top-0"
        onClick={handleClickOutside}
      >
        <div className="p-8 rounded-lg shadow-md modal-content scale-75 md:scale-100 background-transparent backdrop-blur-3xl z-50">
          <span className="absolute right-0 p-2 cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <h2 className="font-bold mb-4 text-4xl text-white">{folderName}</h2>
          <h1 className='text-gray-300 font-extrabol'>{yearReleased}</h1>
          <div className='flex'>
          <h1 className='text-white max-w-[28rem] py-2'>{albumDescription}</h1>
          <a href ={spotifyLink} className="max-w-fit rounded-full mt-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-spotify stroke-green-400 hover:scale-105 hover:stroke-green-200 active:scale-95 transition-all duration-300" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
  <path d="M9 15c1.5 -1 4 -1 5 .5" />
  <path d="M7 9c2 -1 6 -2 10 .5" />
</svg></a>
<a href ={appleMusicLink} className="max-w-fit rounded-full mt-3"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-apple stroke-pink-800" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077z" />
  <path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
</svg></a>
          </div>
          <ul className={`grid grid-cols-${folderContents.length > 5 ? '2' : '1'} gap-4`}>
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
  );
};

export default Modal;

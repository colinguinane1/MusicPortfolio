// Modal.jsx
import React from "react";
import { motion, spring } from "framer-motion";

const Modal = ({ folderName, folderContents, tidyFileName, onClose }) => {
  const artist = "Colin Guinane";

  const handleClickOutside = (event) => {
    // Check if the click occurred outside the modal content
    if (!event.target.closest(".modal-content")) {
      onClose(); // Close the modal
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: spring, duration: 0.75 }}
      className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-8 rounded shadow-md modal-content pr-20">
        <span
          className="absolute top-0 right-0 p-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="font-bold mb-4 text-4xl">{folderName}</h2>
        <ul className="">
          {folderContents.map((item, index) => (
            <li key={index} className="flex items-center space-x-4 py-2 px-2">
              <img
                src={`https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`}
                alt="Icon"
                className="h-16 w-16" // Increase image size as needed
              />
              <div>
                <span className="">{tidyFileName(item.name)}</span>
                <br></br>
                <span className="text-sm text-gray-500">{artist}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Modal;

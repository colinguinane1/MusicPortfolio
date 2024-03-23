// Modal.jsx
import React from "react";

const Modal = ({ folderName, folderContents, tidyFileName, onClose }) => {
  const artist = "Colin Guinane";

  const handleClickOutside = (event) => {
    // Check if the click occurred outside the modal content
    if (!event.target.closest(".modal-content")) {
      onClose(); // Close the modal
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-8 rounded shadow-md modal-content">
        <span
          className="absolute top-0 right-0 p-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-xl font-bold mb-4 text-4xl">{folderName}</h2>
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
    </div>
  );
};

export default Modal;

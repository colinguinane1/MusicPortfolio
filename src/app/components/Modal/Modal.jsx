// Modal.jsx
import React from "react";

const Modal = ({ folderName, folderContents, tidyFileName, onClose }) => {
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
        <h2 className="text-xl font-bold mb-4">{folderName}</h2>
        <ul>
          {folderContents.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 border border-black py-2 px-2"
            >
              <img
                src={`https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`}
                alt="Icon"
                className="h-6 w-6"
              />
              <span>{tidyFileName(item.name)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;

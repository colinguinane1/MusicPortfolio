"use client";
// MusicPlayer.jsx
import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";

const MusicPlayer = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderContents, setFolderContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/storage/v1/b/music-portfolio-67eb6.appspot.com/o?prefix=music"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch folders");
        }
        const data = await response.json();
        const folderSet = new Set();
        data.items.forEach((item) => {
          const parts = item.name.split("/");
          if (parts.length > 1) {
            folderSet.add(parts[1]); // Assuming the folder name is the second part of the path
          }
        });
        setFolders(Array.from(folderSet));
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  const fetchFolderContents = async (folderName) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/storage/v1/b/music-portfolio-67eb6.appspot.com/o?prefix=music/${folderName}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch folder contents");
      }
      const data = await response.json();
      // Filter files by allowed file extensions
      const filteredFiles = data.items.filter((item) =>
        /\.(flac|mp3|ogg|wav)$/i.test(item.name)
      );
      setFolderContents(filteredFiles);
    } catch (error) {
      console.error("Error fetching folder contents:", error);
    }
  };

  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);
    fetchFolderContents(folderName);
    setIsModalOpen(true); // Open the modal
  };

  const tidyFileName = (fileName) => {
    const parts = fileName.split("/");
    const name = parts[parts.length - 1]; // Extract file name without path
    return name.replace(/\.[^.]+$/, ""); // Remove file extension
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <h1>Music Player</h1>
      <div>
        {folders.map((folder, index) => (
          <div key={index}>
            <button onClick={() => handleFolderSelect(folder)}>{folder}</button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          folderName={selectedFolder}
          folderContents={folderContents}
          tidyFileName={tidyFileName}
          onClose={handleCloseModal} // Pass the handleCloseModal function to the Modal
        />
      )}
    </div>
  );
};

export default MusicPlayer;

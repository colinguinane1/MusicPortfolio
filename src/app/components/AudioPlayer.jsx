"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";

const MusicPlayer = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderContents, setFolderContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [folderLoading, setFolderLoading] = useState({});

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

        const uniqueFolders = new Map();
        data.items.forEach((item) => {
          const folderName = item.name.split("/")[1];
          if (!uniqueFolders.has(folderName) && folderName !== "") {
            const coverUrl = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/cover.jpg`;
            uniqueFolders.set(folderName, {
              name: folderName,
              coverUrl: coverUrl,
            });
          }
        });

        setFolders(Array.from(uniqueFolders.values()));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching folders:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const fetchFolderContents = async (folderName) => {
    try {
      setFolderLoading((prevState) => ({
        ...prevState,
        [folderName]: true,
      }));

      const response = await fetch(
        `https://www.googleapis.com/storage/v1/b/music-portfolio-67eb6.appspot.com/o?prefix=music/${folderName}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch folder contents");
      }
      const data = await response.json();
      const filteredFiles = data.items.filter((item) =>
        /\.(flac|mp3|ogg|wav)$/i.test(item.name)
      );
      setFolderContents(filteredFiles);
      setFolderLoading((prevState) => ({
        ...prevState,
        [folderName]: false,
      }));
    } catch (error) {
      console.error("Error fetching folder contents:", error);
    }
  };

  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);
    fetchFolderContents(folderName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tidyFileName = (fileName) => {
    const parts = fileName.split("/");
    const name = parts[parts.length - 1];
    return name.replace(/\.[^.]+$/, "");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Music Player</h1>
      <div className="grid grid-cols-3 gap-4">
        {folders.map((folder, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleFolderSelect(folder.name)}
              className="block w-full h-full bg-gray-200 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img
                src={folder.coverUrl}
                alt={`Cover for ${folder.name}`}
                className="w-full h-auto"
              />
              {folderLoading[folder.name] && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                  <svg
                    className="animate-spin h-8 w-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120 12h-4a4 4 0 00-4-4V0C8.727 0 4.155 3.669 4 8.291z"
                    ></path>
                  </svg>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          folderName={selectedFolder}
          folderContents={folderContents}
          tidyFileName={tidyFileName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MusicPlayer;

"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import { motion, spring, AnimatePresence } from "framer-motion";
import Player from "./Player";
import { useMediaQuery } from "@react-hook/media-query";
import Image from "next/image";

const MusicPlayer = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderContents, setFolderContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [folderLoading, setFolderLoading] = useState({});
  const [metadata, setMetadata] = useState(null); // State for metadata
  const [currentSong, setCurrentSong] = useState(null);
  const [currentCover, setCurrentCover] = useState(null);
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const [selectedSong, setSelectedSong] = useState(null);
  const [isMostRecentSelected, setIsMostRecentSelected] = useState(true);
  const [gridCols, setGridCols] = useState(2);
  const [gridSettingsDropdown, setGridSettingsDropdown] = useState(false);

  const handlePlay = () => {
    setIsPlaying(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentSong(null);
  };

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
          if (folderName) {
            // Replace backslashes with forward slashes in folderName
            const normalizedFolderName = folderName.replace(/\\/g, "/");
            const coverUrl = `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${normalizedFolderName}/cover.jpg`;
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

  const handleFolderSelect = async (folderName) => {
    if (!isLargeScreen) {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
    setSelectedFolder(folderName);
    //console.log(currentCover); DEBUGGING
    fetchFolderContents(folderName);
    setIsModalOpen(true);

    // Fetch metadata for the selected album
    try {
      const response = await fetch(
        `https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/music/${folderName}/metadata.json`,
        {
          headers: {
            Origin: [
              "http://localhost:3000",
              "https://music.colinguinane.com",
              "http://music.colinguinane.com",
              "http://colinguinane.com",
            ],
          },
        }
      );
      //console.log(response); DEBUGGING
      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }
      const metadataJson = await response.json();
      setMetadata(metadataJson);
      //console.log(metadataJson); DEBUGGING
    } catch (error) {
      console.error("Error fetching metadata:", error);
      setMetadata(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tidyFileName = (fileName) => {
    const parts = fileName.split("/");
    const name = parts[parts.length - 1];
    // Remove any additional folder prefixes in the name
    const tidyName = name.replace(/^.*[\\\/]/, "");
    return tidyName.replace(/\.[^.]+$/, "");
  };

  const tidyAlbumName = (folderName) => {
    // Remove leading numbers followed by a dot and trim any spaces
    return folderName.replace(/^\d+\./, "").trim();
  };

  const handleSortChange = (event) => {
    setIsMostRecentSelected(event.target.value === "recent");
    console.log(isMostRecentSelected);
  };

  if (loading) {
    return <div className="">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentSong(song.name); // Assuming song.name holds the file path of the song
  };

  const addColumns = () => {
    if (gridCols < 4) {
      setGridCols((prevGridCols) => {
        const updatedGridCols = prevGridCols + 1;
        console.log(updatedGridCols);
        return updatedGridCols;
      });
    }
  };

  const subtractColumns = () => {
    if (gridCols > 1) {
      setGridCols((prevGridCols) => {
        const updatedGridCols = prevGridCols - 1;
        console.log(updatedGridCols);
        return updatedGridCols;
      });
    }
  };

  const toggleGridSettings = () => {
    setGridSettingsDropdown(!gridSettingsDropdown);
  };

  return (
    <div>
      <Player
        currentSong={currentSong}
        currentCover={currentCover}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handlePlay={handlePlay}
        songs={folderContents.map((item) => item.name)}
        coverUrl={
          selectedFolder
            ? folders.find((folder) => folder.name === selectedFolder).coverUrl
            : ""
        }
      />
      <div className="flex justify-center items-center   flex-col mx-4">
        <div className="mt-[5rem] w-full flex items-center gap-6 -mb-14">
          <div className="">
            <motion.button
              className="no_transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleGridSettings}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={`icon icon-tabler icon-tabler-settings transition-all dark:stroke-white stroke-black dark:hover:stroke-blue-500 hover:stroke-blue-500 ${
                  gridSettingsDropdown
                    ? "rotate-45 stroke-blue-500"
                    : "stroke-black dark:stroke-white"
                } `}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>
            </motion.button>
          </div>
          <AnimatePresence>
            {gridSettingsDropdown && (
              <motion.div
                initial={{ x: -100, scale: 0 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: -100 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="flex gap-6 -mt-2 bg-white border dark:bg-black dark:border-gray-600 border-gray-300 px-4 p-1 rounded-full items-center no_transition"
              >
                <div className="flex gap-1">
                  <select id="sort" onChange={handleSortChange}>
                    <option value="recent">Sort: Recent</option>
                    <option value="oldest">Sort: Oldest</option>
                  </select>
                </div>
                <div className="flex gap-6">
                  <motion.button
                    whileHover={gridCols == 4 ? { scale: 1 } : { scale: 1.1 }}
                    whileTap={gridCols == 4 ? { scale: 1 } : { scale: 0.9 }}
                    onClick={addColumns}
                    className=""
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class={`icon icon-tabler icon-tabler-layout-grid-add stroke-black dark:hover:stroke-blue-500 hover:stroke-blue-500 dark:stroke-white ${
                        gridCols == 4
                          ? "stroke-slate-500 hover:stroke-slate-500 dark:stroke-slate-400 dark:hover:stroke-slate-400  cursor-not-allowed"
                          : ""
                      }`}
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                      <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                      <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                      <path d="M14 17h6m-3 -3v6" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={gridCols == 1 ? { scale: 1 } : { scale: 1.1 }}
                    whileTap={gridCols == 1 ? { scale: 1 } : { scale: 0.9 }}
                    onClick={subtractColumns}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class={`icon icon-tabler icon-tabler-layout-grid-remove stroke-black dark:hover:stroke-blue-500 hover:stroke-blue-500 dark:stroke-white ${
                        gridCols == 1
                          ? "stroke:slate-300 dark:stroke-slate-400 dark:hover:stroke-slate-400 hover:stroke-slate-300 cursor-not-allowed"
                          : ""
                      }`}
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-4z" />
                      <path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-4z" />
                      <path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-4z" />
                      <path d="M14 17h6" />
                    </svg>
                  </motion.button>
                  {/* <h1 className="text-sm">{gridCols}</h1>  ------- was just for debugging*/}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* I KNOW THIS IS A LAZY UNSCALEABLE FIX BUT GOD DAMN I TRIED TO FIX THIS FOR SO LONG */}
        <div
          className={`grid grid-cols-${gridCols} max-w-[800px] md:gap-4  gap-2 items-center mt-20 pb-3 z-[1] ${
            gridCols === 4 ? "grid-cols-4" : ""
          } ${gridCols === 3 ? "grid-cols-3" : ""} ${
            gridCols === 2 ? "grid-cols-2" : ""
          } ${gridCols === 1 ? "grid-cols-1" : ""}`}
        >
          {isMostRecentSelected
            ? folders
                .slice()
                .reverse()
                .map((folder, index) => (
                  <div key={index} className="relative">
                    <motion.button
                      whileHover={
                        isLargeScreen ? { scale: 1.01 } : { scale: 1.02 }
                      }
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", duration: 0.4 }}
                      onClick={() => handleFolderSelect(folder.name)}
                      className="w-full h-full rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no_transition"
                    >
                      <img
                        src={folder.coverUrl}
                        alt={`Cover for ${folder.name}`}
                        className="w-screen"
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
                    </motion.button>
                  </div>
                ))
            : folders.slice().map((folder, index) => (
                <div key={index} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: spring }}
                    onClick={() => handleFolderSelect(folder.name)}
                    className="w-full h-full rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no_transition"
                  >
                    <img
                      src={folder.coverUrl}
                      alt={`Cover for ${folder.name}`}
                      className="w-screen"
                      width={240}
                      height={240}
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
                  </motion.button>
                </div>
              ))}
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            setCurrentCover={setCurrentCover}
            currentCover={currentCover}
            folderName={selectedFolder}
            folderContents={folderContents}
            tidyFileName={tidyFileName}
            tidyAlbumName={tidyAlbumName}
            onClose={handleCloseModal}
            setCurrentSong={setCurrentSong}
            handlePlay={handlePlay}
            isPlaying={isPlaying}
            // Pass metadata to the Modal component
            artistChoice={metadata ? metadata.artistChoice : ""}
            websiteExclusive={metadata ? metadata.websiteExclusive : ""}
            albumDescription={metadata ? metadata.albumDescription : ""}
            yearReleased={metadata ? metadata.yearReleased : ""}
            spotifyLink={metadata ? metadata.spotifyLink : ""}
            appleMusicLink={metadata ? metadata.appleMusicLink : ""}
            youtubeLink={metadata ? metadata.youtubeLink : ""}
            inspirationLink={metadata ? metadata.inspiration : ""}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;

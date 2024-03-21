"use client";

import React, { useEffect, useState, useRef } from "react";

const AudioPlayer = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchFileList = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/storage/v1/b/music-portfolio-67eb6.appspot.com/o?prefix=music/the_storm"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch file list");
        }
        const data = await response.json();
        setFileList(data.items);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchFileList();
  }, []);

  const getFileName = (filePath) => {
    const parts = filePath.split("/");
    const fileNameWithExtension = parts[parts.length - 1];
    return fileNameWithExtension.split(".")[0]; // Extracting only filename (without extension)
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  return (
    <main>
      <h1>Audio Files</h1>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            <button onClick={() => handleFileSelect(file)}>
              {getFileName(file.name)}
            </button>
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div>
          <h2>Selected File:</h2>
          <audio controls ref={audioRef}>
            <source
              src={`https://storage.googleapis.com/music-portfolio-67eb6.appspot.com/${selectedFile.name}`}
              type={selectedFile.contentType}
            />
          </audio>
          <p>{getFileName(selectedFile.name)}</p>
        </div>
      )}
    </main>
  );
};

export default AudioPlayer;

import Image from "next/image";
import Index from "./components";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqq43sVRhemeW11DRTZN9PomvOsRSKQg8",
  authDomain: "music-portfolio-67eb6.firebaseapp.com",
  projectId: "music-portfolio-67eb6",
  storageBucket: "music-portfolio-67eb6.appspot.com",
  messagingSenderId: "546754219569",
  appId: "1:546754219569:web:4ade5ec4562088afb68f10",
  measurementId: "G-H1JZ6K36X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function Home() {
  return (
    <Index />
  );
}

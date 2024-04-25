import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [justClicked, setJustClicked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThemeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (justClicked) {
      const timeoutId = setTimeout(() => {
        setJustClicked(false);
      }, 100); // Adjust the delay time as needed
      return () => clearTimeout(timeoutId);
    }
  }, [justClicked]);

  if (!mounted) return null;

  const handleChangeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const toggleThemeDropdown = () => {
    if (!justClicked) {
      setJustClicked(true);
      setThemeDropdown(!themeDropdown);
    }
  };

  return (
    <div className="">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center max-h-fit bg-black dark:bg-white  text-white p-2 rounded-full"
          onClick={toggleThemeDropdown}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-circle-dot stroke-white"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-circle-dot stroke-black"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            </svg>
          )}
          <h1 className="mx-2 dark:text-black md:hidden">Theme</h1>
        </motion.button>
        <AnimatePresence>
          {themeDropdown && (
            <motion.div
              ref={dropdownRef}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute mt-2 w-[8rem]  bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
            >
              <button
                className=" w-full text-left px-4 py-2  text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                onClick={() => handleChangeTheme("light")}
              >
                Light Mode
              </button>
              <button
                className=" w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                onClick={() => handleChangeTheme("dark")}
              >
                Dark Mode
              </button>
              {/* Display OLED mode button when the current theme is OLED */}
              <button
                className=" w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                onClick={() => handleChangeTheme("oled")}
              >
                OLED Mode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

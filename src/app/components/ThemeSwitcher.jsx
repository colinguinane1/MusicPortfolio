import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [themeDropdown, setThemeDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChangeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const toggleThemeDropdown = () => {
    setThemeDropdown(!themeDropdown);
  };

  return (
    <div className="">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center max-h-fit bg-black  text-white p-2 rounded-full"
          onClick={toggleThemeDropdown}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-5 md:h-5 w-10 h-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM10 5a1 1 0 110-2 1 1 0 010 2z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a5 5 0 0110 0c0 2.13-1.84 3.03-3.22 3.89l-1.38 4.14c-.16.48-.76.48-.92 0l-1.38-4.14C6.84 13.03 5 12.13 5 10zm2.34-.16a1.5 1.5 0 012.63 0 1.5 1.5 0 01-2.63 0zm6.32 0a1.5 1.5 0 112.63 0 1.5 1.5 0 01-2.63 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </motion.button>
        {themeDropdown && (
          <AnimatePresence>
            <motion.div
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
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

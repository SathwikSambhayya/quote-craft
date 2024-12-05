import React, { useState } from "react";
import { APP_ROUTES } from "../../CommonConstants.ts";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    navigate(APP_ROUTES.HOME);
    localStorage.clear();
    toast("Logged out!", { position: "bottom-left" });
  };
  return (
    <header
      className={`z-50 fixed top-0 right-0 w-full p-4 bg-white dark:bg-stone-900 transition-all ${
        darkMode ? "dark" : ""
      } font-sourGummy md:px-28 py-3 shadow-sm`}
    >
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-stone-900 dark:text-white ">
          Quote Craft <span className="text-3xl">📜</span>
        </div>

        <div className="hidden md:flex space-x-4">
          <button
            onClick={toggleDarkMode}
            className="text-sm py-1 px-4  text-stone-900 dark:text-white rounded-md hover:bg-stone-900 dark:hover:bg-white dark:hover:text-stone-900 hover:text-white"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {localStorage.authToken && (
            <button
              onClick={() => handleLogout()}
              className="text-sm py-1 px-4  text-stone-900 dark:text-white rounded-md hover:bg-stone-900 dark:hover:bg-white dark:hover:text-stone-900 hover:text-white"
            >
              Logout
            </button>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl  dark:text-white"
        >
          &#9776;
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 z-50">
          <button
            onClick={toggleDarkMode}
            className="text-sm py-1 px-4  text-stone-900 dark:text-white rounded-md"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {localStorage.authToken && (
            <button
              onClick={handleLogout}
              className="text-sm py-1 px-4  text-stone-900 dark:text-white rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

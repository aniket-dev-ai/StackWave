import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/SLice/ThemeSlice"; // ✅ Correctly import the action

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode); // ✅ Get current theme from Redux

  const themeChange = () => {
    dispatch(toggleTheme()); // ✅ Dispatch correct action
  };

  return (
    <div>
      <button
        onClick={themeChange}
        className={`p-4 m-2 fixed  rounded-3xl ${
          theme === "light" ? "bg-light-400" : "bg-dark-300"
        } text-white`}
      >
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle;

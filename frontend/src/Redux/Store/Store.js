import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../SLice/ThemeSlice"; // ✅ Import the reducer, not an action

const store = configureStore({
  reducer: {
    theme: themeReducer, // ✅ Correct reducer assignment
  },
});

export default store;

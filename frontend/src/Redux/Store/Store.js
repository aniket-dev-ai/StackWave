import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../SLice/ThemeSlice"; // ✅ Import the reducer, not an action
import authReducer from "../SLice/AuthSlice"; // ✅ Import the auth reducer
import SignUpreducer from "../SLice/SignUpSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer, // ✅ Correct reducer assignment
    auth: authReducer,
    signup: SignUpreducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../SLice/ThemeSlice"; // ✅ Import the reducer, not an action
import authReducer from "../SLice/AuthSlice"; // ✅ Import the auth reducer
import SignUpreducer from "../SLice/SignUpSlice";
import questionReducer from "../SLice/questionSlice"; // ✅ Import the question reducer
import answerReducer from "../SLice/answerSlice"; // ✅ Import the answer reducer
import commentReducer from "../SLice/CommentSlice"; // ✅ Import the comment reducer
import replyReducer from "../SLice/ReplySlice"; // ✅ Import the reply reducer

console.log("🚀 Question Reducer:", questionReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    signup: SignUpreducer,
    questions: questionReducer,
    answers: answerReducer,
    comments: commentReducer,
    replies: replyReducer,
  },
});
console.log("🔥 Redux Store State:", store.getState());
export default store;

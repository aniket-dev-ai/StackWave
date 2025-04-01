import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAnswer,
  getAnswersForQuestion,
  updateAnswer,
  deleteAnswer,
  upvoteAnswer,
  downvoteAnswer,
} from "./API/answerApi";

// 🔹 Async Thunks

export const fetchAnswers = createAsyncThunk(
  "answer/answers/fetchAll",
  async (questionId) => {
    return await getAnswersForQuestion(questionId);
  }
);

export const createAnswer = createAsyncThunk(
  "answers/add",
  async ({ questionId, data }) => addAnswer(questionId, data)
);

export const modifyAnswer = createAsyncThunk(
  "answers/update",
  async ({ answerId, data }) => updateAnswer(answerId, data)
);

export const removeAnswer = createAsyncThunk(
  "answers/delete",
  async (answerId) => deleteAnswer(answerId)
);

export const upvote = createAsyncThunk("answers/upvote", async (answerId) =>
  upvoteAnswer(answerId)
);

export const downvote = createAsyncThunk("answers/downvote", async (answerId) =>
  downvoteAnswer(answerId)
);

// 🔹 Helper to handle pending, fulfilled, and rejected states
const handleAsyncState = (builder) => {
  builder
    .addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state) => {
        state.loading = false;
      }
    )
    .addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
};

// 🔹 Slice Definition

const answerSlice = createSlice({
  name: "answers",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.list = action.payload;
        console.log("Fetched Answers:", action.payload);
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(modifyAnswer.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (answer) => answer.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(removeAnswer.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (answer) => answer.id !== action.payload.id
        );
      })
      .addCase(upvote.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (answer) => answer.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index].votes = action.payload.votes;
        }
      })
      .addCase(downvote.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (answer) => answer.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index].votes = action.payload.votes;
        }
      });
    // Handle async states using the helper function
    handleAsyncState(builder);
  },
});

export default answerSlice.reducer;

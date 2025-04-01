import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addComment,
  getCommentsForAnswer,
  updateComment,
  deleteComment,
} from "./API/commentsApi";

// 🔹 Async Thunks
export const fetchComments = createAsyncThunk(
  "comments/fetchAll",
  async (answerId) => getCommentsForAnswer(answerId)
);
export const createComment = createAsyncThunk(
  "comments/add",
  async ({ answerId, data }) => addComment(answerId, data)
);
export const modifyComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, data }) => updateComment(commentId, data)
);
export const removeComment = createAsyncThunk(
  "comments/delete",
  async (commentId) => deleteComment(commentId)
);

const commentSlice = createSlice({
  name: "comments",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.list = action.payload;
      })
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
  },
});

export default commentSlice.reducer;

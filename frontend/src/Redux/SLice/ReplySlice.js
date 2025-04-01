import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  addReplyToComment, 
  getRepliesForComment, 
  addReplyToReply, 
  getRepliesForReply, 
  updateReply, 
  deleteReply 
} from "./API/replyApi"; // Corrected import path

// 🔹 Async Thunks
export const fetchRepliesForComment = createAsyncThunk("replies/fetchForComment", async (commentId) => getRepliesForComment(commentId));
export const createReplyToComment = createAsyncThunk("replies/addToComment", async ({ commentId, data }) => addReplyToComment(commentId, data));
export const fetchRepliesForReply = createAsyncThunk("replies/fetchForReply", async (replyId) => getRepliesForReply(replyId));
export const createReplyToReply = createAsyncThunk("replies/addToReply", async ({ replyId, data }) => addReplyToReply(replyId, data));
export const modifyReply = createAsyncThunk("replies/update", async ({ replyId, data }) => updateReply(replyId, data));
export const removeReply = createAsyncThunk("replies/delete", async (replyId) => deleteReply(replyId));

const replySlice = createSlice({
  name: "replies",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepliesForComment.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchRepliesForReply.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload]; // Nested replies handle karne ke liye
      })
      .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith("/fulfilled"), (state) => {
        state.loading = false;
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default replySlice.reducer;

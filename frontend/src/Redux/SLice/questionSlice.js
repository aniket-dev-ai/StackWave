import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "./API/questionApi";

// 🔹 Async Thunks
export const fetchQuestions = createAsyncThunk("getall", async () => {
  return await getAllQuestions();
});
export const fetchQuestionById = createAsyncThunk(
  "questions/fetchById",
  async (id) => {
    return await getQuestionById(id);
  }
);
export const addQuestion = createAsyncThunk(
  "questions/create",
  async (data) => {
    return await createQuestion(data);
  }
);
export const modifyQuestion = createAsyncThunk(
  "questions/update",
  async ({ id, data }) => {
    return await updateQuestion(id, data);
  }
);
export const removeQuestion = createAsyncThunk(
  "questions/delete",
  async (id) => {
    return await deleteQuestion(id);
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState: { list: [], selected: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(modifyQuestion.fulfilled, (state, action) => {
        const index = state.list.findIndex((q) => q._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeQuestion.fulfilled, (state, action) => {
        state.list = state.list.filter((q) => q._id !== action.meta.arg);
      })
      .addCase(removeQuestion.rejected, (state, action) => {
        state.error = action.error.message;
        alert(
          "Error deleting question: Hey You can't delete this question because you are not the owner of this question"
        );
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.error = action.error.message;
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
          state.error = action.error.message;
        }
      );
  },
});
console.log("🚀 Question Slice Reducer Loaded:", questionSlice.reducer);
export default questionSlice.reducer;

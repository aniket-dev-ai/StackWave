import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register,
  verifyRegisterOtp,
  login,
  verifyLoginOtp,
  resetPassword,
  generateResetPasswordLink,
} from "./API/AuthApi";

// 🔹 Generic Async Function Creator
const createAuthThunk = (type, apiFunc) =>
  createAsyncThunk(type, async (data, { rejectWithValue }) => {
    try {
      return await apiFunc(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  });

// 🔹 Auth Actions
export const registerUser = createAuthThunk("auth/register", register);
export const verifyRegisterOtpUser = createAuthThunk(
  "auth/registerverifyOTP",
  verifyRegisterOtp
);
export const loginUser = createAuthThunk("auth/login", login);
export const verifyLoginOtpUser = createAuthThunk(
  "auth/verifyLoginOtp",
  verifyLoginOtp
);
export const resetPasswordLinkGenerateUser = createAuthThunk(
  "auth/resetpasswordLinkGenerate",
  generateResetPasswordLink
);
export const resetPasswordUser = createAuthThunk(
  "auth/resetpassword/",
  resetPassword
);

// 🔹 Initial State
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  otpFormat: "",
  resetLinkSent: false,
  passwordResetSuccess: false,
  Email: "",
};

// 🔹 Reducer helpers to reduce repetition
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFulfilled = (state, action, type) => {
  state.loading = false;
  switch (type) {
    case "register":
      console.log(action);
      console.log(state);
      state.user = action.payload.user;
      state.otpFormat = "Register";
      break;
    case "login":
      (state.otpFormat = "Login"), (state.Email = action.meta.arg.Email);
      console.log(state);
      break;
    case "verifyRegisterOtp":
    case "verifyLoginOtp":
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      break;
    case "resetPasswordLinkGenerate":
      state.resetLinkSent = true;
      break;
    case "resetPassword":
      state.passwordResetSuccess = true;
      break;
    default:
      break;
  }
};

// 🔹 Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) =>
        handleFulfilled(state, action, "register")
      )
      .addCase(registerUser.rejected, handleRejected)

      .addCase(verifyRegisterOtpUser.pending, handlePending)
      .addCase(verifyRegisterOtpUser.fulfilled, (state, action) =>
        handleFulfilled(state, action, "verifyRegisterOtp")
      )
      .addCase(verifyRegisterOtpUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) =>
        handleFulfilled(state, action, "login")
      )
      .addCase(loginUser.rejected, handleRejected)

      .addCase(verifyLoginOtpUser.pending, handlePending)
      .addCase(verifyLoginOtpUser.fulfilled, (state, action) =>
        handleFulfilled(state, action, "verifyLoginOtp")
      )
      .addCase(verifyLoginOtpUser.rejected, handleRejected)

      .addCase(resetPasswordLinkGenerateUser.pending, handlePending)
      .addCase(resetPasswordLinkGenerateUser.fulfilled, (state) =>
        handleFulfilled(state, {}, "resetPasswordLinkGenerate")
      )
      .addCase(resetPasswordLinkGenerateUser.rejected, handleRejected)

      .addCase(resetPasswordUser.pending, handlePending)
      .addCase(resetPasswordUser.fulfilled, (state) =>
        handleFulfilled(state, {}, "resetPassword")
      )
      .addCase(resetPasswordUser.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register,
  verifyRegisterOtp,
  login,
  verifyLoginOtp,
  resetPassword,
  generateResetPasswordLink,
  logout,
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
export const logoutUser = createAuthThunk("auth/logout", logout);

// 🔹 Initial State
const initialState = {
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
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
      console.log(action);
      (state.otpFormat = "Login"), (state.Email = action.payload.user.Email);
      break;
    case "verifyRegisterOtp":
    case "verifyLoginOtp":
      console.log(action);
      console.log(state);
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
  reducers: {},
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
      .addCase(verifyLoginOtpUser.fulfilled, (state, action) => {
        console.log("verifyLoginOtpUser Success Payload:", action.payload); // Check response
        if (action.payload && action.payload.token) {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          state.error = "Invalid OTP verification response";
        }
      })

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
      .addCase(resetPasswordUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.otpFormat = "";
        state.resetLinkSent = false;
        state.passwordResetSuccess = false;
        state.Email = "";
        localStorage.clear(); // Ensure all auth-related data is cleared
      });
  },
});

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register,
  verifyRegisterOtp,
  login,
  verifyLoginOtp,
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

// 🔹 Initial State
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  otpFormat: "",
};

// 🔹 Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.otpFormat = "Register";
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(verifyRegisterOtpUser.pending, handlePending)
      .addCase(verifyRegisterOtpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(verifyRegisterOtpUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.otpFormat = "Login";
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(verifyLoginOtpUser.pending, handlePending)
      .addCase(verifyLoginOtpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(verifyLoginOtpUser.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

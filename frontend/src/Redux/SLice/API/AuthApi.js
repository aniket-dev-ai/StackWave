import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Generic Function for API Requests
const request = async (method, endpoint, data) => {
  try {
    const response = await API[method](endpoint, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error.response?.data || "Something went wrong!";
  }
};

// 🔹 Auth API Functions
export const register = (userData) => request("post", "/register", userData);
export const verifyRegisterOtp = (otpData) => request("post", "/registerverifyOTP", otpData);
export const login = (loginData) => request("post", "/login", loginData);
export const verifyLoginOtp = (otpData) => request("post", "/loginVerifyOtp", otpData);

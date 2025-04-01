import axios from "axios"; 

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Generic Function for API Requests (Fixed)
const request = async (method, endpoint, data = null) => {
  try {
    // 🔹 Token Fetch Karna
    const token = localStorage.getItem("token");

    // 🔹 Token Ko Headers Me Set Karna
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // 🔹 GET Requests Me `data` Pass Na Karna
    const response =
      method === "get"
        ? await API[method](endpoint) // GET requests me data pass nahi hota
        : await API[method](endpoint, data);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error.response?.data || "Something went wrong!";
  }
};


// 🔹 Auth API Functions
export const register = (userData) => request("post", "/register", userData);
export const verifyRegisterOtp = (otpData) =>
  request("post", "/registerverifyOTP", otpData);
export const login = (loginData) => request("post", "/login", loginData);
export const verifyLoginOtp = (email, otpData) => {
  console.log("Email : ", email.Email);
  const Email = email.Email;
  console.log("otpData : ", email.otp);
  const otp = email.otp;
  return request("post", "/loginVerifyOtp", { Email, otp });
};
export const generateResetPasswordLink = (Email) =>
  request("post", "/resetpasswordLinkGenerate", Email);
export const resetPassword = (tokens, Passwords) => {
  const token = tokens.token;
  console.log("Token : ", token);
  const Password = tokens.Password;
  console.log("Password : ", Password);
  console.log(`/resetpassword/${token}`);

  // Change: Wrap the Password in an object before sending it in the request body
  return request("post", `/resetpassword/${token}`, { Password });
};
export const logout = () => request("post", "/logout");

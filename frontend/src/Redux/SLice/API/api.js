import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Generic Function for API Requests
const request = async (method, endpoint, data = null) => {
  try {
    // 🔹 Token ko Local Storage se Fetch Karna
    const token = localStorage.getItem("token");

    // 🔹 Token ko Headers me Automatically Set Karna
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // 🔹 GET Requests ke liye `data` ko avoid karna
    const response =
      method === "get"
        ? await API[method](endpoint) // ❌ GET ke saath data nahi bhejte
        : await API[method](endpoint, data);

    console.log("📢 API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error.response?.data || "Something went wrong!";
  }
};

export default request;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Generic Request Function
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

export default request;

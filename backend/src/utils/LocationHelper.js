// src/utils/locationHelper.js
import axios from "axios";

export const getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(
      `https://ipinfo.io/${ip}/json?token=1523ae4842e415`
    );
    return response.data; // City, Region, Country
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

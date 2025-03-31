import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaDiscord,
  FaReddit,
} from "react-icons/fa";
import { registerUser } from "../../Redux/SLice/AuthSlice";
import {
  setEmail,
  setName,
  setPassword,
  setPhone,
} from "../../Redux/SLice/SignUpSlice";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log("User Data:", userData);
    dispatch(setName(userData.Name)); // Save name in Redux store
    dispatch(setEmail(userData.Email)); // Save name in Redux store
    dispatch(setPassword(userData.Password)); // Save name in Redux store
    dispatch(setPhone(userData.Phone)); // Save name in Redux store

    dispatch(registerUser(userData));
    navigate("/otp"); // Redirect to OTP page after signup
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full transition-colors duration-300 ${
        theme === "light"
          ? "bg-light-300 text-green-800  "
          : "bg-dark-100 text-light-100"
      }`}
    >
      <div className="flex flex-col md:flex-row w-[90%]  h-auto md:h-[90vh] shadow-lg rounded-xl overflow-hidden bg-opacity-90">
        {/* Left Side - Quotes + Login Link */}
        <div
          className={`hidden md:flex flex-1 flex-col items-center justify-center text-center p-10 ${
            theme === "light"
              ? "bg-gradient-to-br from-light-200 to-light-300"
              : "bg-gradient-to-br from-dark-200 to-dark-300"
          }`}
        >
          <p className="text-2xl font-semibold italic leading-relaxed">
            "Code is like humor. When you have to explain it, it’s bad."
          </p>
          <p className="mt-4 text-sm font-light">- Cory House</p>

          <p className="mt-8 text-lg font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-500 hover:text-green-600 transition"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Right Side - Form */}
        <div
          className={`flex-1 p-10 flex flex-col justify-center ${
            theme === "light" ? "bg-light-200" : "bg-dark-200"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Create an Account
          </h2>

          {/* OAuth Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            {[
              {
                Icon: FaGoogle,
                color: "bg-blue-500",
                hover: "hover:bg-blue-600",
                text: "Google",
              },
              {
                Icon: FaFacebook,
                color: "bg-blue-700",
                hover: "hover:bg-blue-800",
                text: "Facebook",
              },
              {
                Icon: FaGithub,
                color: "bg-gray-800",
                hover: "hover:bg-gray-900",
                text: "GitHub",
              },
              {
                Icon: FaDiscord,
                color: "bg-purple-600",
                hover: "hover:bg-purple-700",
                text: "Discord",
              },
              {
                Icon: FaReddit,
                color: "bg-red-600",
                hover: "hover:bg-red-700",
                text: "Reddit",
              },
            ].map(({ Icon, color, hover, text }, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 ${color} text-white px-4 py-4 rounded-full ${hover} transition`}
              >
                <Icon />
              </button>
            ))}
          </div>

          <div className="text-center text-gray-500 dark:text-gray-300 my-3">
            OR
          </div>

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto space-y-4"
          >
            {[
              { type: "text", name: "Name", placeholder: "Full Name" },
              { type: "email", name: "Email", placeholder: "Email Address" },
              { type: "password", name: "Password", placeholder: "Password" },
              { type: "number", name: "Phone", placeholder: "Phone Number" },
            ].map(({ type, name, placeholder }, index) => (
              <input
                key={index}
                type={type}
                name={name}
                placeholder={placeholder}
                value={userData[name]}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded transition ${
                  theme === "light"
                    ? "bg-light-100 text-green-800 border-gray-300 focus:border-green-500"
                    : "bg-dark-300 border-gray-600 focus:border-green-400"
                }`}
              />
            ))}

            <textarea
              placeholder="Bio"
              className={`w-full px-4 py-3 border rounded transition ${
                theme === "light"
                  ? "bg-light-100 text-green-800 border-gray-300 focus:border-green-500"
                  : "bg-dark-300 border-gray-600 focus:border-green-400"
              }`}
            ></textarea>

            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <p className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
            <button
              type="submit"
              className={`w-full text-white py-3 rounded font-semibold text-lg transition ${
                theme === "light"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

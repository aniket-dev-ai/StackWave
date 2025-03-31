import React, { useState } from "react";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [input, setInput] = useState("");
  const [isEmail, setIsEmail] = useState(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Check if input is an email or phone number
    setIsEmail(/^\S+@\S+\.\S+$/.test(value)); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", input);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full transition-colors duration-300 ${
        theme === "light" ? "bg-light-300 text-dark-300" : "bg-dark-100 text-light-300"
      }`}
    >
      <div className="flex flex-col md:flex-row w-[60%] h-[60vh] shadow-lg rounded-xl overflow-hidden bg-opacity-90">
        
        {/* Left Side - Info / Illustration */}
        <div
          className={`hidden md:flex flex-1 flex-col items-center justify-center text-center p-8 ${
            theme === "light" ? "bg-gradient-to-br from-light-200 to-light-300" : "bg-gradient-to-br from-dark-200 to-dark-300"
          }`}
        >
          <h2 className="text-3xl font-bold">Forgot Password?</h2>
          <p className="mt-4 text-lg italic">"The best password is the one you never remember." - Security Expert</p>
        </div>

        {/* Right Side - Form */}
        <div
          className={`flex-1 p-10 flex flex-col justify-center ${
            theme === "light" ? "bg-light-200" : "bg-dark-200"
          }`}
        >
          <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Enter your email or phone number to receive reset instructions.
          </p>

          {/* Input Field */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type={isEmail ? "email" : "text"}
              placeholder="Enter Email or Phone"
              value={input}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded transition ${
                theme === "light" ? "bg-light-100 border-gray-400 focus:border-green-500" : "bg-dark-300 border-gray-600 focus:border-green-400"
              }`}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded font-semibold text-lg transition ${
                theme === "light"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-green-700 hover:bg-green-800 text-white"
              }`}
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <a href="#" className="text-blue-500 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

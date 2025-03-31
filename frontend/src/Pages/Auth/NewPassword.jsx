import React, { useState } from "react";
import { useSelector } from "react-redux";

const NewPassword = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); 
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Password successfully reset!");
    alert("Password changed successfully!");
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full transition-colors duration-300 ${
        theme === "light" ? "bg-light-300 text-dark-300" : "bg-dark-100 text-light-300"
      }`}
    >
      <div className="flex flex-col md:flex-row w-[70%] h-[70vh] shadow-lg rounded-xl overflow-hidden bg-opacity-90">
        
        {/* Left Side - Security Quote */}
        <div
          className={`hidden md:flex flex-1 flex-col items-center justify-center text-center p-8 ${
            theme === "light" ? "bg-gradient-to-br from-light-200 to-light-300" : "bg-gradient-to-br from-dark-200 to-dark-300"
          }`}
        >
          <h2 className="text-3xl font-bold">Secure Your Account</h2>
          <p className="mt-4 text-lg italic">"A strong password is the first step to a secure digital life." - Cyber Expert</p>
        </div>

        {/* Right Side - Form */}
        <div
          className={`flex-1 p-10 flex flex-col justify-center ${
            theme === "light" ? "bg-light-200" : "bg-dark-200"
          }`}
        >
          <h2 className="text-2xl font-bold text-center">Set a New Password</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Enter a strong password to secure your account.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-2 border rounded transition ${
                  theme === "light" ? "bg-light-100 border-gray-400 focus:border-green-500" : "bg-dark-300 border-gray-600 focus:border-green-400"
                }`}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                onClick={toggleVisibility}
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full px-4 py-2 border rounded transition ${
                  theme === "light" ? "bg-light-100 border-gray-400 focus:border-green-500" : "bg-dark-300 border-gray-600 focus:border-green-400"
                }`}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded font-semibold text-lg transition ${
                theme === "light"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-green-700 hover:bg-green-800 text-white"
              }`}
            >
              Reset Password
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

export default NewPassword;

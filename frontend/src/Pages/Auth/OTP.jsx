import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const OTPVerification = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendOTP = () => {
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full p-4 transition-colors duration-300 ${
        theme === "light"
          ? "bg-light-300 text-dark-300"
          : "bg-dark-100 text-light-300"
      }`}
    >
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-xl overflow-hidden bg-opacity-90">
        {/* Left Side - Illustration / OTP Info */}
        <div
          className={`hidden md:flex flex-1 flex-col items-center justify-center text-center p-8 ${
            theme === "light"
              ? "bg-gradient-to-br from-light-200 to-light-300"
              : "bg-gradient-to-br from-dark-200 to-dark-300"
          }`}
        >
          <h2 className="text-3xl font-bold">Verify Your OTP</h2>
          <p className="mt-4 text-lg italic">
            "Security is not a product, but a process." - Bruce Schneier
          </p>
        </div>

        {/* Right Side - OTP Form */}
        <div
          className={`flex-1 p-6 sm:p-10 flex flex-col gap-y-5 justify-center ${
            theme === "light" ? "bg-light-200" : "bg-dark-200"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Enter OTP Code
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
            We sent a 6-digit code to your phone/email.
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                maxLength="1"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-10 h-12 sm:w-12 sm:h-14 text-2xl text-center border rounded transition-all focus:outline-none ${
                  theme === "light"
                    ? "bg-light-200 border-gray-400 focus:border-green-500"
                    : "bg-dark-300 border-gray-600 focus:border-green-400"
                }`}
              />
            ))}
          </div>

          <button
            className={`mx-auto py-3 rounded font-semibold w-full sm:w-[60%] text-lg transition ${
              theme === "light"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-green-700 hover:bg-green-800 text-white"
            }`}
          >
            Verify OTP
          </button>

          <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
            {resendTimer > 0 ? (
              <p>Resend OTP in {resendTimer}s</p>
            ) : (
              <button
                onClick={resendOTP}
                className="text-blue-500 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;

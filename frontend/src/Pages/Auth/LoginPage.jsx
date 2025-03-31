import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaGoogle, FaFacebook, FaGithub, FaDiscord, FaReddit } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const [useEmail, setUseEmail] = useState(true); // Toggle for Email/Phone

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full transition-colors duration-300 ${
        theme === "light" ? "bg-light-300 text-dark-300" : "bg-dark-100 text-light-300"
      }`}
    >
      <div className="flex flex-col md:flex-row w-[90vw] h-[85vh] shadow-lg rounded-xl overflow-hidden bg-opacity-90">
        
        {/* Left Side - Illustration / Welcome Message */}
        <div
          className={`hidden md:flex flex-1 flex-col items-center justify-center text-center p-10 ${
            theme === "light" ? "bg-gradient-to-br from-light-200 to-light-300" : "bg-gradient-to-br from-dark-200 to-dark-300"
          }`}
        >
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-4 text-lg italic">"The best way to predict the future is to create it." - Alan Kay</p>
          
          <p className="mt-8 text-lg font-medium">
            Don't have an account?{" "}
            <a href="#" className="text-green-500 hover:text-green-600 transition">
              Sign up here
            </a>
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div
          className={`flex-1 p-10 flex flex-col justify-center ${
            theme === "light" ? "bg-light-200" : "bg-dark-200"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Login to Your Account</h2>

          {/* Toggle Email/Phone */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-l ${
                useEmail ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setUseEmail(true)}
            >
              Email
            </button>
            <button
              className={`px-4 py-2 rounded-r ${
                !useEmail ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setUseEmail(false)}
            >
              Phone
            </button>
          </div>

          {/* Login Form */}
          <form className="w-full max-w-lg mx-auto space-y-4">
            <input
              type={useEmail ? "email" : "tel"}
              placeholder={useEmail ? "Email Address" : "Phone Number"}
              className={`w-full px-4 py-3 border rounded transition ${
                theme === "light" ? "bg-light-100 border-gray-300 focus:border-green-500" : "bg-dark-300 border-gray-600 focus:border-green-400"
              }`}
            />

            <input
              type="password"
              placeholder="Password"
              className={`w-full px-4 py-3 border rounded transition ${
                theme === "light" ? "bg-light-100 border-gray-300 focus:border-green-500" : "bg-dark-300 border-gray-600 focus:border-green-400"
              }`}
            />

            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </div>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full text-white py-3 rounded font-semibold text-lg transition ${
                theme === "light" ? "bg-green-500 hover:bg-green-600" : "bg-green-700 hover:bg-green-800"
              }`}
            >
              Login
            </button>
          </form>

          <div className="text-center text-gray-500 dark:text-gray-300 my-4">OR</div>

          {/* OAuth Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { Icon: FaGoogle, color: "bg-blue-500", hover: "hover:bg-blue-600", text: "Google" },
              { Icon: FaFacebook, color: "bg-blue-700", hover: "hover:bg-blue-800", text: "Facebook" },
              { Icon: FaGithub, color: "bg-gray-800", hover: "hover:bg-gray-900", text: "GitHub" },
              { Icon: FaDiscord, color: "bg-purple-600", hover: "hover:bg-purple-700", text: "Discord" },
              { Icon: FaReddit, color: "bg-red-600", hover: "hover:bg-red-700", text: "Reddit" },
            ].map(({ Icon, color, hover, text }, index) => (
              <button key={index} className={`flex items-center gap-2 ${color} text-white p-4 rounded-full ${hover} transition`}>
                <Icon />  
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

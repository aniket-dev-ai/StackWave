import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/SLice/AuthSlice";
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaDiscord,
  FaReddit,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
  });

  const [useEmail, setUseEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", userData);
    dispatch(loginUser(userData));
  };

  const themeClasses =
    theme === "light"
      ? "bg-light-100 border-gray-300 focus:border-green-500"
      : "bg-dark-300 border-gray-600 focus:border-green-400";

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full transition-colors duration-300 ${
        theme === "light"
          ? "bg-light-300 text-dark-300"
          : "bg-dark-100 text-light-300"
      }`}
    >
      <div className="flex flex-col md:flex-row w-[90vw] h-[85vh] shadow-lg rounded-xl overflow-hidden bg-opacity-90">
        {/* Left Side - Welcome */}
        <div
          className={`hidden md:flex flex-1 flex-col items-center justify-center text-center p-10 ${
            theme === "light"
              ? "bg-gradient-to-br from-light-200 to-light-300"
              : "bg-gradient-to-br from-dark-200 to-dark-300"
          }`}
        >
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-4 text-lg italic">
            "The best way to predict the future is to create it." - Alan Kay
          </p>
          <p className="mt-8 text-lg font-medium">
            Don't have an account?{" "}
            <a href="#" className="text-green-500 hover:text-green-600 transition">
              Sign up here
            </a>
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className={`flex-1 p-10 flex flex-col justify-center ${theme === "light" ? "bg-light-200" : "bg-dark-200"}`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Login to Your Account</h2>

          {/* Toggle Email/Phone */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-l ${
                useEmail ? "bg-green-500 text-white" : "bg-light-400 text-white"
              }`}
              onClick={() => setUseEmail(true)}
            >
              Email
            </button>
            <button
              className={`px-4 py-2 rounded-r ${
                !useEmail ? "bg-green-500 text-white" : "bg-light-400 text-white"
              }`}
              onClick={() => setUseEmail(false)}
            >
              Phone
            </button>
          </div>

          {/* Login Form */}
          <form className="w-full max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
            <input
              type={useEmail ? "email" : "tel"}
              name={useEmail ? "Email" : "Phone"}
              value={useEmail ? userData.Email : userData.Phone}
              onChange={handleInputChange}
              placeholder={useEmail ? "Email Address" : "Phone Number"}
              className={`w-full px-4 py-3 border rounded transition ${themeClasses}`}
            />

            {/* Password Input with Show/Hide Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                placeholder="Password"
                value={userData.Password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded transition ${themeClasses}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

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
              { Icon: FaGoogle, color: "bg-blue-500", hover: "hover:bg-blue-600" },
              { Icon: FaFacebook, color: "bg-blue-700", hover: "hover:bg-blue-800" },
              { Icon: FaGithub, color: "bg-gray-800", hover: "hover:bg-gray-900" },
              { Icon: FaDiscord, color: "bg-purple-600", hover: "hover:bg-purple-700" },
              { Icon: FaReddit, color: "bg-red-600", hover: "hover:bg-red-700" },
            ].map(({ Icon, color, hover }, index) => (
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

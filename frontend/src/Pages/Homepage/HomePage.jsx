import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "../../Redux/SLice/questionSlice";
import { logout } from "../../Redux/SLice/AuthSlice";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { getAllQuestions } from "../../Redux/SLice/API/questionApi";

const HomePage = () => {
  const dispatch = useDispatch();

  // 🔹 Redux Store se Data Fetching
  const { user } = useSelector((state) => state.auth); 
  const {
    list: questions,
    loading,
    error,
  } = useSelector((state) => state.questions);
  const theme = useSelector((state) => state.theme.mode);

  // 🔹 Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());

  }, [dispatch]);

  console.log("📢 Questions from Redux:", questions); 
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-light-300 text-dark-300"
          : "bg-dark-100 text-light-300"
      }`}
    >
      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-opacity-90">
        <h1 className="text-2xl font-bold">StackWave</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-semibold">{user.name}</span>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <FaBars className="text-xl cursor-pointer" />
            </button>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Signup
            </Link>
          </div>
        )}
      </nav>

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>
        <ul className="p-4 space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 hover:bg-gray-700 rounded-md"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/edit-profile"
              className="block p-2 hover:bg-gray-700 rounded-md"
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => dispatch(logout())}
              className="w-full p-2 bg-red-500 rounded-md text-center"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* 🔹 Questions List */}
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-4">Latest Questions</h2>
        {loading && <p>Loading questions...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid gap-4">
          {questions.map((q) => (
            <div
              key={q._id}
              className="p-4 shadow-md  rounded-lg bg-opacity-80 border"
            >
              <Link
                to={`/questions/${q._id}`}
                className="text-3xl  font-semibold text-green-500 hover:underline"
              >
                {q.Question}
              </Link>
              <p className="text-gray-600 mt-2">{q.Description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

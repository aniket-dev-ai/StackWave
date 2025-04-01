import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions, removeQuestion } from "../../Redux/SLice/questionSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { logoutUser } from "../../Redux/SLice/AuthSlice";
import { deleteQuestion } from "../../Redux/SLice/API/questionApi";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // 🔹 Delete Question Handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(removeQuestion(id));
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-light-300 text-dark-300"
          : "bg-dark-100 text-light-300"
      }`}
    >
      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-2xl bg-opacity-90  text-white">
        <h1 className="text-2xl font-bold tracking-wide">StackWave</h1>
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
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
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
              onClick={() => {
                dispatch(logoutUser());
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload(); // Force UI update after logout
              }}
              className="w-full p-2 bg-red-500 rounded-md text-center hover:bg-red-600 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* 🔹 Questions List */}
      <main className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-4">Latest Questions</h2>
          <Link to={user ? "/ask" : "/login"}>
            <button
              className={`px-4 py-2 font-semibold  text-white rounded-md  transition ${
                theme === "light"
                  ? "bg-light-300 shadow-inner hover:bg-green-600"
                  : "bg-dark-200  hover:bg-dark-300"
              }`}
            >
              Ask Question
            </button>
          </Link>
        </div>
        {loading && <p>Loading questions...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid gap-6">
          {questions.map((q) => (
            <div
              key={q._id}
              className="p-6 text-white shadow-lg rounded-lg border-2 border-gray-700 hover:shadow-2xl transition"
            >
              <div className="flex justify-between items-center">
                <Link
                  to={`/questions/${q._id}`}
                  className={`text-xl font-semibold hover:underline ${
                    theme === "light" ? "text-green-800" : "text-light-200"
                  }`}
                >
                  {q.Question}
                </Link>
                {user && user._id === q.user && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/edit-question/${q._id}`)}
                      className="text-yellow-400 hover:text-yellow-500 transition"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                )}
              </div>
              <p
                className={`mt-2 ${
                  theme === "light" ? "text-green-800" : "text-green-300"
                }`}
              >
                {q.Description}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-gray-400 text-sm">
                    {q.Tags.join(", ")}
                </span>
                <span className="text-gray-400 text-sm">
                  Asked by: {q.CreatedBy?.Name}
                </span>
            </div>
              <span className="text-gray-400 text-sm">
                {new Date(q.CreatedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

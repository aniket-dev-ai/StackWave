import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { addQuestion } from "../../Redux/SLice/questionSlice"; 

const AskQuestion = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [Question, setQuestion] = useState("What is HTML?");
  const [Description, setDescription] = useState("wertyuioplkjhgfdsazxcvbnm,lkjhgfdsawertyuiopokjhgfdszxcvbnm,");
  const [Tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("wwe");
 
  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };
 
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...Tags, tagInput.trim()]);
      setTagInput("");
    }
  }; 
  const removeTag = (index) => {
    setTags(Tags.filter((_, i) => i !== index));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Question.trim() || !Description || Tags.length === 0) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const newQuestion = {
       Question,
      Description,
      Tags,
    };

    await dispatch(addQuestion(newQuestion));  
 
 
    navigate("/");
  };

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-light-300 text-green-800" : "bg-dark-100 text-light-100"
      }`}
    >
      <div className="container mx-auto max-w-2xl bg-opacity-90 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Ask a Question</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
   
          <input
            type="text"
            placeholder="Enter your Question title..."
            value={Question}
            onChange={(e) => setQuestion(e.target.value)}
            className={`w-full px-4 py-3 border rounded transition ${
              theme === "light"
                ? "bg-light-100 text-green-800 border-gray-300 focus:border-green-500"
                : "bg-dark-300 border-gray-600 focus:border-green-400"
            }`}
          />
 
          <label className="block font-semibold">Description</label>
          <input
            type="text"
            value={Description}
            onChange={(value) => setDescription(value)}
            className="border rounded"
          />
 
          <label className="block font-semibold">Tags</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={handleTagInput}
              onKeyDown={handleTagKeyDown}
              className={`flex-grow px-4 py-2 border rounded transition ${
                theme === "light"
                  ? "bg-light-100 text-green-800 border-gray-300 focus:border-green-500"
                  : "bg-dark-300 border-gray-600 focus:border-green-400"
              }`}
            />
          </div>
 
          <div className="flex flex-wrap gap-2 mt-2">
            {Tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  className="ml-2 text-xs hover:text-red-400"
                  onClick={() => removeTag(index)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
 
          <button
            type="submit"
            className={`w-full text-white py-3 rounded font-semibold text-lg transition ${
              theme === "light"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;

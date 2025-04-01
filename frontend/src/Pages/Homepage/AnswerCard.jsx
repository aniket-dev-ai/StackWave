import React from "react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import ThemeToggle from "../../Component/ThemeToggle";
import { useSelector } from "react-redux";

const AnswerCard = ({ answer }) => {
  const theme = useSelector((state) => state.theme.mode);
  const handleUpvote = () => {
    console.log("Upvoted answer", answer.id);
  };

  const handleDownvote = () => {
    console.log("Downvoted answer", answer.id);
  };

  const handleCommentClick = () => {
    console.log("Comment section clicked for answer", answer.id);
  };

  const handleEditComment = (commentId) => {
    console.log("Edit comment", commentId);
  };

  const handleRemoveComment = (commentId) => {
    console.log("Remove comment", commentId);
  };

  const handleReplyClick = (commentId) => {
    console.log("Show replies for comment", commentId);
  };

  return (
    <div className={`border-b p-6 mb-6 shadow-lg rounded-lg ${
    theme === "light" ? "text-white bg-light-300" : "bg-dark-200  shadow-white text-white"
    } transition`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-xl">{answer.Answer}</p>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUpvote}
            className="flex items-center text-green-500 hover:text-green-600"
          >
            <FaThumbsUp />
            <span className="ml-1">{answer.upvotes}</span>
          </button>
          <button
            onClick={handleDownvote}
            className="flex items-center text-red-500 hover:text-red-600"
          >
            <FaThumbsDown />
            <span className="ml-1">{answer.downvotes}</span>
          </button>
          <button
            onClick={handleCommentClick}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaComment />
            <span className="ml-1">{answer.comments.length} Comments</span>
          </button>
        </div>
      </div>

      {/* Answer Text */}
      <p className="mt-4 text-lg text-gray-800">{answer.answer}</p>

      {/* Comment Section */}
      <div className="mt-4 space-y-4">
        {answer.comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-100 p-4 rounded-md shadow-sm"
          >
            <p>{comment.comment}</p>
            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => handleEditComment(comment.id)}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveComment(comment.id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerCard;

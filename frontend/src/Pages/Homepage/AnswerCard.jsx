import React from "react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";

const AnswerCard = ({ answer }) => {
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
    <div className="border-b pb-6 mb-6">
      <div className="flex items-center justify-between">
        {answer.Answer}
        <div className="flex items-center space-x-4">
          <button onClick={handleUpvote} className="flex items-center">
            <FaThumbsUp className="text-green-500" />
            <span>{answer.upvotes}</span>
          </button>
          <button onClick={handleDownvote} className="flex items-center">
            <FaThumbsDown className="text-red-500" />
            <span>{answer.downvotes}</span>
          </button>
          <button onClick={handleCommentClick} className="flex items-center">
            <FaComment className="text-blue-500" />
            <span>{answer.comments.length} Comments</span>
          </button>
        </div>
      </div>
      <p className="mt-4 text-lg">{answer.answer}</p>

      {/* Comment Section */}
      <div className="mt-4 space-y-4">
        {answer.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-md">
            <p>{comment.comment}</p>
            <div className="mt-2 flex space-x-4">
              <button onClick={() => handleEditComment(comment.id)} className="text-blue-500">
                Edit
              </button>
              <button onClick={() => handleRemoveComment(comment.id)} className="text-red-500">
                Remove
              </button>
              {/* {comment.replies.length > 0 && (
                <button onClick={() => handleReplyClick(comment.id)} className="text-green-500">
                  See replies
                </button>
              )} */}
            </div>
            {/* Nested Replies */}
            {/* {comment.replies.length > 0 && (
              <div className="mt-2 pl-6">
                {comment.replies.map((reply) => (
                  <p key={reply.id} className="text-gray-700">
                    - {reply.reply}
                  </p>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerCard;

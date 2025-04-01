import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchAnswers } from "../../Redux/SLice/answerSlice"; 
import AnswerCard from "./AnswerCard";

const QuestionsPage = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const { questionId } = useParams();

  const questionData = useSelector((state) => state.answers.list); // Directly get answers from Redux

  useEffect(() => {
    dispatch(fetchAnswers(questionId));
  }, [dispatch, questionId]);

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-light-300 text-green-800" : "bg-dark-100 text-light-100"
      }`}
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {/* Assuming you have question data somewhere else or fetching it */}
          How do I optimize my React app performance?
        </h1>

        {questionData.length > 0 ? (
          questionData.map((answer) => (
            <AnswerCard key={answer._id} answer={answer} />
          ))
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;

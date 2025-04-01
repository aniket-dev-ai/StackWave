import request from "./api";

// 🔹 Answer APIs
export const addAnswer = (questionId, data) => request("post", `/answer/answer/${questionId}`, data);
export const getAnswersForQuestion = (questionId) => request("get", `/answer/answers/${questionId}`);
export const updateAnswer = (answerId, data) => request("put", `/answer/update/${answerId}`, data);
export const deleteAnswer = (answerId) => request("delete", `/answer/delete/${answerId}`);
export const upvoteAnswer = (answerId) => request("post", `/answer/upvote/${answerId}`);
export const downvoteAnswer = (answerId) => request("post", `/answer/downvote/${answerId}`);

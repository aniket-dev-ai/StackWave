import request from "./api";

// 🔹 Comment APIs
export const addComment = (answerId, data) => request("post", `/comment/${answerId}`, data);
export const getCommentsForAnswer = (answerId) => request("get", `/comments/${answerId}`);
export const updateComment = (commentId, data) => request("put", `/comment/update/${commentId}`, data);
export const deleteComment = (commentId) => request("delete", `/comment/delete/${commentId}`);

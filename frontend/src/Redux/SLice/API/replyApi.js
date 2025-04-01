import request from "./api";

// 🔹 Reply APIs
export const addReplyToComment = (commentId, data) =>
  request("post", `/reply/${commentId}`, data);
export const getRepliesForComment = (commentId) =>
  request("get", `/replies/${commentId}`);
export const addReplyToReply = (replyId, data) =>
  request("post", `/reply/${replyId}`, data);
export const getRepliesForReply = (replyId) =>
  request("get", `/replies/${replyId}`);
export const updateReply = (replyId, data) =>
  request("put", `/reply/update/${replyId}`, data);
export const deleteReply = (replyId) =>
  request("delete", `/reply/delete/${replyId}`);

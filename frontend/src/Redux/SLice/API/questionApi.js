import request from "./api";

export const createQuestion = (data) =>
  request("post", "/question/create", data);
export const getAllQuestions = () => request("get", "/question/getall");
export const getQuestionById = (id) => request("get", `/question/get/${id}`);
export const updateQuestion = (id, data) =>
  request("put", `/question/update/${id}`, data);
export const deleteQuestion = (id) =>
  request("delete", `/question/delete/${id}`);

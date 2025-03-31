import express from "express";
import {
  addAnswer,
  getAnswersForQuestion,
  updateAnswer,
  deleteAnswer,
  upvoteAnswer,
  downvoteAnswer,
} from "../controllers/AnswerController.js";

import { Auth } from "../MiddleWare/Auth.js";
import { AuthAdmin } from "../MiddleWare/Auth.js";

const router = express.Router();

router.post("/answer/:questionId", Auth, addAnswer);
router.get("/answers/:questionId", getAnswersForQuestion);
router.put("/answer/update/:answerId", Auth, updateAnswer);
router.delete("/answer/delete/:answerId", Auth, deleteAnswer);
router.post("/answer/upvote/:answerId", Auth, upvoteAnswer);
router.post("/answer/downvote/:answerId", Auth, downvoteAnswer);

export default router;

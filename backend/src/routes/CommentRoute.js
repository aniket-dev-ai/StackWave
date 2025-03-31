import express from "express";
import {
  addComment,
  getCommentsForAnswer,
  updateComment,
  deleteComment,
} from "../controllers/CommentCOntroller.js";

import { Auth } from "../MiddleWare/Auth.js";

const router = express.Router();

router.post("/comment/:answerId", Auth, addComment);
router.get("/comments/:answerId", getCommentsForAnswer);
router.put("/comment/update/:commentId", Auth, updateComment);
router.delete("/comment/delete/:commentId", Auth, deleteComment);

export default router;

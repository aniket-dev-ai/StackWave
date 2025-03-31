import express from "express";
import {
  addReplytocomment,
  getRepliesForComment,
  addreplytoreply,
  getRepliesForReply,
  updateReply,
  deleteReply,
} from "../controllers/ReplyController.js";
import { Auth } from "../MiddleWare/Auth.js";
const router = express.Router();

router.post("/reply/:commentId", Auth, addReplytocomment);
router.get("/replies/:commentId", getRepliesForComment);
router.post("/reply/:replyId", Auth, addreplytoreply);
router.get("/replies/:replyId", getRepliesForReply);
router.put("/reply/update/:replyId", Auth, updateReply);
router.delete("/reply/delete/:replyId", Auth, deleteReply);

export default router;

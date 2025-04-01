import express from "express";
import {
    createQuestion,
    getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/QuestionController.js";
import { Auth } from "../MiddleWare/Auth.js";
import { AuthAdmin } from "../MiddleWare/Auth.js";

const router = express.Router();

router.post("/create", Auth, createQuestion);
router.get("/getall",Auth,  getAllQuestions);
router.get("/get/:id", getQuestionById);
router.put("/update/:id", Auth, updateQuestion);
router.delete("/delete/:id", Auth, deleteQuestion);


export default router;
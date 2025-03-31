import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./config/dbConfig.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/QuestionRoute.js";
import answerRoutes from "./routes/AnswerRoute.js";
import commentRoutes from "./routes/CommentRoute.js";
import replyRoutes from "./routes/ReplyRoute.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" ,
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectdb();

app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/reply", replyRoutes);

export default app;

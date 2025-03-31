import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./config/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";

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

export default app;

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectdb from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectdb()

app.use("/api/auth", authRoutes);

export default app;


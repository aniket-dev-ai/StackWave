import express from "express";
import {register,verifyOTP} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyOTP", verifyOTP);

export default router;
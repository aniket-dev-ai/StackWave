import express from "express";
import {register,registerverifyOTP , login , loginVerifyOtp} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", register);
router.post("/registerverifyOTP", registerverifyOTP);
router.post("/login", login);
router.post("/loginVerifyOtp", loginVerifyOtp);

export default router;
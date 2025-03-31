import express from "express";
import {register,registerverifyOTP , login , loginVerifyOtp , resetpasswordLinkGenerate , resetpassword} from "../controllers/authController.js";
import { Auth } from "../MiddleWare/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/registerverifyOTP", registerverifyOTP);
router.post("/login", login);

router.post("/loginVerifyOtp", loginVerifyOtp);
router.post("/resetpasswordLinkGenerate", resetpasswordLinkGenerate);
router.post("/resetpassword/:token" ,Auth, resetpassword);

export default router;
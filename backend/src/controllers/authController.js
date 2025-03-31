import OTP from "../models/OTP.js";
import User from "../models/User.js";
import { getDeviceInfo } from "../utils/DeviceHelper.js";
import {
  SendAccountCreationConfirmation,
  sendOTP,
  sentLoginOtp,
  successfullyLogin,
} from "../utils/emailSender.js";
import { getLocationFromIP } from "../utils/LocationHelper.js";
import { generateOTP } from "../utils/otpGenerator.js";

export const register = async (req, res) => {
  try {
    const { Name, Email, Phone, Password } = req.body;
    if (!Name || !Email || !Phone || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findByEmailorPhone(Email, Phone);
    if (existingUser) {
      return res.status(400).json({ message: "Email or Phone already exists" });
    }

    const otp = generateOTP();
    console.log(otp);

    const otpEntry = new OTP({
      email: Email,
      otp: otp,
      purpose: "Register",
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await otpEntry.save();

    await sendOTP(Email, otp);

    res.status(200).json({
      message: "OTP sent to your email =>" + Email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerverifyOTP = async (req, res) => {
  try {
    const { Name, Email, Phone, Password, otp } = req.body;
    if(!Name || !Email || !Phone || !Password || !otp) {
        res.status(400).json({ message: "All fields are required" });
    }
    console.log(Name, Email, Phone, Password, otp);
    const otpEntry = await OTP.findOne({ email: Email, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const newUser = new User({
      Name,
      Email,
      Phone,
    });

    newUser.Password = await newUser.PasswordHash(Password);

    await newUser.save();

    await OTP.deleteOne({ Email });

    await SendAccountCreationConfirmation(Email, Name);
    const token = newUser.generateJWT();
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        Name: newUser.Name,
        Email: newUser.Email,
        Phone: newUser.Phone,
        Role: newUser.Role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findByEmailorPhone(Email, Email);
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const isPasswordValid = await existingUser.PasswordCompare(Password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const otp = generateOTP();
    console.log(otp);

    const otpEntry = new OTP({
      email: Email,
      otp: otp,
      purpose: "Login",
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await otpEntry.save();

    await sentLoginOtp(Email, otp, existingUser.Name);

    res.status(200).json({
      message: "OTP sent to your email =>" + Email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginVerifyOtp = async (req, res) => {
  try {
    const { Email, otp } = req.body;

    const otpEntry = await OTP.findOne({ email: Email, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    await OTP.deleteOne({ Email });

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔹 Login time fetch karo
    const loginTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    console.log("Login time:", loginTime);

    const token = user.generateJWT();
    await successfullyLogin(Email, user.Name, loginTime);
    console.log("Login successful");
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        Name: user.Name,
        Email: user.Email,
        Phone: user.Phone,
        Role: user.Role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

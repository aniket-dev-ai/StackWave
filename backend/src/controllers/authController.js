import OTP from "../models/OTP.js";
import User from "../models/User.js";
import {  SendAccountCreationConfirmation, sendOTP } from "../utils/emailSender.js";
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
    2;
    const otpEntry = new OTP({
      email: Email,
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    console.log(otpEntry);

    await otpEntry.save();
    // Send OTP to the user's email
    await sendOTP(Email, otp);

    res.status(200).json({
      message: "OTP sent to your email =>" + Email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { Name, Email, Phone, Password, otp } = req.body;

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

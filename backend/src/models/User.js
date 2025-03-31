import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Phone: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  Bio: {
    type: String,
    default: "",
  },
  ProfilePic: {
    type: String,
    default: "",
  },
});

userSchema.methods.PasswordHash = async function (Password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(Password, salt);
};

userSchema.methods.PasswordCompare = async function (Password) {
  return await bcrypt.compare(Password, this.Password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { id: this._id, Email: this.Email, Role: this.Role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

userSchema.statics.findByEmailorPhone = async function (Email, Phone) {
  const user = await this.findOne({
    $or: [{ Email: Email }, { Phone: Phone }],
  });
  return user;
};

export default mongoose.model("User", userSchema);

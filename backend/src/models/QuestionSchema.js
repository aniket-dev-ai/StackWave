import mongoose, { Mongoose } from "mongoose";

const QuestionSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Answer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer", 
    },
  ],
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Tags: [
    {
      type: [String],
      required: true,
    },
  ],
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;

import mongoose from "mongoose"; 

const CommentSchema = new mongoose.Schema({
  Comment: {
    type: String,
    required: true,
  },
Answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true,
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
  reply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;

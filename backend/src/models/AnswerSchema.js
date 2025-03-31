import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    Answer: {
        type: String,
        required: true,
    },
    Question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    upvotes: {
        upvotedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        type: Number,
        default: 0,
    },
    downvotes: {
        downvotedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
})

const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;
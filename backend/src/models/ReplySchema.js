import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    Reply: {
        type: String,
        required: true,
    },
    Comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
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
})

const Reply = mongoose.model("Reply", ReplySchema);
export default Reply;
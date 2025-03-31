import ReplySchema from "../models/ReplySchema.js";
import CommentSchema from "../models/CommentSchema.js";

export const addReplytocomment = async (req, res) => {
  try {
    const { Reply } = req.body;
    const CreatedBy = req.user.id;
    const Comment = req.params.commentId;

    if (!Reply) {
      return res.status(400).json({ message: "Reply is required" });
    }

    const newReply = new ReplySchema({
      Reply,
      Comment,
      CreatedBy,
    });

    await newReply.save();
    await CommentSchema.findByIdAndUpdate(
      Comment,
      {
        $push: { reply: newReply._id },
      },
      { new: true }
    );
    res.status(201).json({ message: "Reply added successfully", newReply });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRepliesForComment = async (req, res) => {
  try {
    const Comment = req.params.commentId;
    const replies = await ReplySchema.find({ Comment })
      .populate("CreatedBy", "Name Email")
      .sort({ CreatedAt: -1 });

    if (!replies) {
      return res
        .status(404)
        .json({ message: "No replies found for this comment" });
    }

    res.status(200).json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addreplytoreply = async (req, res) => {
  try {
    const { Reply } = req.body;
    const CreatedBy = req.user.id;
    const ReplyId = req.params.replyId;

    if (!Reply) {
      return res.status(400).json({ message: "Reply is required" });
    }

    const newReply = new ReplySchema({
      Reply,
      reply: ReplyId,
      CreatedBy,
    });

    await newReply.save();
    res.status(201).json({ message: "Reply added successfully", newReply });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRepliesForReply = async (req, res) => {
  try {
    const ReplyId = req.params.replyId;
    const replies = await ReplySchema.find({ reply: ReplyId })
      .populate("CreatedBy", "Name Email")
      .sort({ CreatedAt: -1 });

    if (!replies) {
      return res
        .status(404)
        .json({ message: "No replies found for this reply" });
    }

    res.status(200).json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateReply = async (req, res) => {
  try {
    const { Reply } = req.body;
    const replyId = req.params.replyId;

    if (!Reply) {
      return res.status(400).json({ message: "Reply is required" });
    }

    const updatedReply = await ReplySchema.findByIdAndUpdate(
      replyId,
      { Reply },
      { new: true }
    );

    if (!updatedReply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    res
      .status(200)
      .json({ message: "Reply updated successfully", updatedReply });
  } catch (error) {
    console.error("Error updating reply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const replyId = req.params.replyId;

    const deletedReply = await ReplySchema.findByIdAndDelete(replyId);

    if (!deletedReply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

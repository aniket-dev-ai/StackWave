import CommentSchema from "../models/CommentSchema.js";
import AnswerSchema from "../models/AnswerSchema.js";

export const addComment = async (req, res) => {
  try {
    const { Comment } = req.body;
    const CreatedBy = req.user.id;
    const Answer = req.params.answerId;
    console.log("Comment:", Comment);
    console.log("CreatedBy:", CreatedBy);
    console.log("Answer:", Answer);

    if (!Comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const newComment = new CommentSchema({
      Comment,
      Answer,
      CreatedBy,
    });

    await newComment.save();

    await AnswerSchema.findByIdAndUpdate(
      Answer,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCommentsForAnswer = async (req, res) => {
  try {
    const Answer = req.params.answerId;
    const comments = await CommentSchema.find({ Answer })
      .populate("CreatedBy", "Name Email")
      .sort({ CreatedAt: -1 });

    if (!comments) {
      return res
        .status(404)
        .json({ message: "No comments found for this answer" });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { Comment } = req.body;
    const commentId = req.params.commentId;

    if (!Comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const updatedComment = await CommentSchema.findByIdAndUpdate(
      commentId,
      { Comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res
      .status(200)
      .json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await CommentSchema.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

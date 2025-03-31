import AnswerSchema from "../models/AnswerSchema.js";
import QuestionSchema from "../models/QuestionSchema.js";

export const addAnswer = async (req, res) => {
  try {
    const { Answer } = req.body;
    const CreatedBy = req.user.id;
    const Question = req.params.questionId;
    console.log("Answer:", Answer);
    console.log("CreatedBy:", CreatedBy);
    console.log("Question:", Question);

    if (!Answer) {
      return res.status(400).json({ message: "Answer is required" });
    }

    const newAnswer = new AnswerSchema({
      Answer,
      Question,
      CreatedBy,
    });

    await newAnswer.save();
    await QuestionSchema.findByIdAndUpdate(
      Question,
      {
        $push: { Answer: newAnswer._id },
      },
      { new: true }
    );

    res.status(201).json({ message: "Answer added successfully", newAnswer });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAnswersForQuestion = async (req, res) => {
  try {
    const Question = req.params.questionId;
    const answers = await AnswerSchema.find({ Question })
      .populate("CreatedBy", "Name Email")
      .sort({ CreatedAt: -1 });

    if (!answers) {
      return res
        .status(404)
        .json({ message: "No answers found for this question" });
    }

    res.status(200).json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAnswer = async (req, res) => {
  try {
    const { Answer } = req.body;
    const answerId = req.params.answerId;

    if (!Answer) {
      return res.status(400).json({ message: "Answer is required" });
    }

    const updatedAnswer = await AnswerSchema.findByIdAndUpdate(
      answerId,
      { Answer },
      { new: true }
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res
      .status(200)
      .json({ message: "Answer updated successfully", updatedAnswer });
  } catch (error) {
    console.error("Error updating answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const answerId = req.params.answerId;

    const deletedAnswer = await AnswerSchema.findByIdAndDelete(answerId);

    if (!deletedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const upvoteAnswer = async (req, res) => {
  try {
    const { id: answerId } = req.params;
    const userId = req.user.id;

    const answer = await AnswerSchema.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const hasUpvoted = answer.upvotedBy.includes(userId);

    let updatedAnswer;
    if (hasUpvoted) {
      updatedAnswer = await AnswerSchema.findByIdAndUpdate(
        answerId,
        {
          $inc: { upvotes: -1 },
          $pull: { upvotedBy: userId },
        },
        { new: true }
      );
    } else {
      updatedAnswer = await AnswerSchema.findByIdAndUpdate(
        answerId,
        {
          $inc: { upvotes: 1 },
          $push: { upvotedBy: userId },
        },
        { new: true }
      );
    }

    res.status(200).json({
      message: hasUpvoted
        ? "Upvote removed successfully"
        : "Answer upvoted successfully",
      updatedAnswer,
    });
  } catch (error) {
    console.error("Error upvoting answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const downvoteAnswer = async (req, res) => {
  try {
    const { id: answerId } = req.params;
    const userId = req.user.id;

    const answer = await AnswerSchema.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const hasDownvoted = answer.downvotedBy.includes(userId);

    let updatedAnswer;
    if (hasDownvoted) {
      updatedAnswer = await AnswerSchema.findByIdAndUpdate(
        answerId,
        {
          $inc: { downvotes: -1 },
          $pull: { downvotedBy: userId },
        },
        { new: true }
      );
    } else {
      updatedAnswer = await AnswerSchema.findByIdAndUpdate(
        answerId,
        {
          $inc: { downvotes: 1 },
          $push: { downvotedBy: userId },
        },
        { new: true }
      );
    }

    res.status(200).json({
      message: hasDownvoted
        ? "Downvote removed successfully"
        : "Answer downvoted successfully",
      updatedAnswer,
    });
  } catch (error) {
    console.error("Error downvoting answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

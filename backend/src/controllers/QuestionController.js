import QuestionSchema from "../models/QuestionSchema.js";

export const createQuestion = async (req, res) => {
  try {
    const { Question, Description, Tags } = req.body;
    console.log(Question, Description, Tags);
    if (!Question || !Description || !Tags) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const CreatedBy = req.user.id;
    console.log("CreatedBy:", CreatedBy); // Debugging ke liye

    const newQuestion = new QuestionSchema({
      Question,
      Description,
      Tags,
      CreatedBy,
    });

    await newQuestion.save();
    res
      .status(201)
      .json({ message: "Question created successfully", newQuestion });
  } catch (error) {
    console.error("Error creating question:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await QuestionSchema.find()
      .populate("CreatedBy", "Name Email")
      .sort({ CreatedAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await QuestionSchema.findById(req.params.id)
      .populate("CreatedBy", "Name Email")
      .sort({ CreatedAt: -1 });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { Question, Description, Tags } = req.body;
    console.log(Question, Description, Tags);
    if (!Question && !Description && !Tags) {
      return res
        .status(400)
        .json({ message: "Atleast one fields are required" });
    }
    try {
      const question = await QuestionSchema.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      if (question.CreatedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      question.Question = Question || question.Question;
      question.Description = Description || question.Description;
      question.Tags = Tags || question.Tags;
      question.UpdatedAt = Date.now();
      const updatedQuestion = await question.save();
      res
        .status(200)
        .json({ message: "Question updated successfully", updatedQuestion });
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteQuestion = async (req, res) => {
  try {
    const question = await QuestionSchema.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    if (question.CreatedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await QuestionSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

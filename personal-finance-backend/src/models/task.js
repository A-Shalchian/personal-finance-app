const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
      validate(value) {
        if (value < Date.now()) {
          throw new Error("Date must be in the future");
        }
      },
    },
    delted: {
      type: Boolean,
      default: false, // marks if a task is soft-deleted
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ owner: 1, title: 1 });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

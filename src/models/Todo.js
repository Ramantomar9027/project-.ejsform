const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  text: String,
  completed: Boolean
});

module.exports = mongoose.model("Todo", todoSchema);
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// auth middleware
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});

// dashboard
router.get("/dashboard", async (req, res) => {
  const todos = await Todo.find({ userId: req.session.user._id });
  res.render("dashboard", { todos });
});

// add
router.post("/add", async (req, res) => {
  await Todo.create({
    userId: req.session.user._id,
    text: req.body.text,
    completed: false
  });
  res.redirect("/dashboard");
});

// delete
router.get("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
});

module.exports = router;
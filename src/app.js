const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// routes
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use("/", authRoutes);
app.use("/", todoRoutes);

// root
app.get("/", (req, res) => {
  res.redirect("/login");
});

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
//http://localhost:3000/register
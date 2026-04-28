const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

//  LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("login");
});

//  REGISTER PAGE
router.get("/register", (req, res) => {
  res.render("register");
});

//  REGISTER USER (password hash)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    //  hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.send("Error in registration");
  }
});

//  LOGIN USER (password compare)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.send("Invalid credentials");

    //  compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("Invalid credentials");

    req.session.user = user;

    res.redirect("/dashboard"); //  correct
  } catch (err) {
    console.log(err);
    res.send("Error in login");
  }
});

//  LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      photo,
    });
    // JWT
    const token = jwt.sign(
      { _id: user._id, name: user.name, photo: user.photo },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({
        message: "success",
      });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, photo } = req.body;
    const user = await User.findOne({ email });
    //validations
    if (!user) return res.status(400).send("Invalid email or password.");
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect)
      return res.status(400).send("Invalid email or password.");
    //JWT
    const token = jwt.sign(
      { _id: user._id, name: user.name, photo: user.photo },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({
        message: "success",
        _id: user._id,
        name: user.name,
        photo: user.photo,
      });
  } catch (error) {
    console.log(error);
  }
});
// Loggedin
router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies.token;

    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    const user = await User.findOne({ _id: claims._id });
    const { password, ...data } = await user.toJSON();
    res.send(data);
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error.message);
  }
});

router.get("/loggedin", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json();
    }

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    res.send(validatedUser);
  } catch (error) {
    return res.json();
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token").send();
});

module.exports = router;

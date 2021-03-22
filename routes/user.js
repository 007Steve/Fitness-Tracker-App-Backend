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


module.exports = router;
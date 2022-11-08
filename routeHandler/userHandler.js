const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create Model For todo schema
const userSchema = require("../schemas/userSchema");

const User = new mongoose.model("User", userSchema);


// signup
router.post("/signup", async (req, res) => {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "Signup successfully",
    });
    
  } catch {
    res.status(500).json({
      error: "There was something wrong",
    });
  }

});


module.exports = router;

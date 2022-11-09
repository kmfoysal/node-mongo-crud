const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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


// Login 
router.post('/login', async(req, res) => {
  try {

    const user = await User.find({userName: req.body.userName});

    if(user && user.length > 0){

      const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)

      if(isValidPassword){
        // Generate Token 

        const token = jwt.sign({
          userId: user[0]._id,
          userName: user[0].userName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
        );

        res.status(200).json({
          access_token: token,
          message: "Login Successful",
        });

      }else{
        res.status(401).json({
          error: "Authintication is failed",
        });
      }

    }else{
      res.status(401).json({
        error: "Authintication is failed",
      });
    }
    
  } catch  {
    
  }
})


module.exports = router;

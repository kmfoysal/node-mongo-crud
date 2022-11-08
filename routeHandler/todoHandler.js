const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Create Model For todo schema
const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

// Get All Todos
router.get("/", async (req, res) => {
      await Todo.find({ status: "active" })
        .select({
          _id: 0,
          __v: 0,
          date: 0,
        })
        .limit(2)
        .exec((err, data) => {
          if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
              result: data,
              message: "Success",
            });
          }
        });
});

// Get a Single Todo by id
router.get("/:id", async (req, res) => {});

// Post a Todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);

  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo added successfully",
      });
    }
  });
});

// Post multiple Todos
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was server side error",
      });
    } else {
      res.status(200).json({
        message: "Todos added successfully",
      });
    }
  });
});

// Put a Todo
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully!",
        });
      }
    }
  );
  console.log(result);
}
);

// Delete Todo
router.put("/:id", async (req, res) => {});

module.exports = router;

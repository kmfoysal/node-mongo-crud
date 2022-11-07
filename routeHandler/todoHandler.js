const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// Create Model For todo schema 
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);

// Get All Todos 
router.get('/', async(req, res)=>{

})

// Get Single Todo by id
router.get('/:id', async(req, res)=>{

})

// Post Todo 
router.post('/', async(req, res)=>{

})

// Post multiple Todos 
router.get('/all', async(req, res)=>{

})

// Put Todo 
router.put('/:id', async(req, res)=>{

})

// Delete Todo 
router.put('/:id', async(req, res)=>{

})



module.exports = router;
const express = require("express");
const mongoose = require("mongoose");

const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require("./routeHandler/userHandler");


// express app initialization
const app = express();
app.use(express.json());

// db connection with mongoose
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));


//   Routing 
app.use('/todo', todoHandler);
app.use("/user", userHandler);



app.listen(5000, () => {
  console.log("Server running at port 5000");
});

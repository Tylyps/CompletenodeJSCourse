const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

//Middleware
app.use(express.json())

//App routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
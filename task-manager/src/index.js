const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json())

//App routes
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
	const user = await User.findById("62533082a2783570548b4f50");
	await user.populate("tasks");
	console.log(user.tasks);

	// const task = await Task.findById("62533117916a749c15ba92be")
	// await task.populate("owner");
	// console.log(task.owner);
}

main()
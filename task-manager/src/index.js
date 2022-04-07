const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post("/users", (req, res) => {
	const user = new User(req.body);
	user.save()
		.then((result) => {
			console.log(result);
			res.status(201).send(result);
		})
		.catch((error) => {
			console.log(error);
			res.status(400).send(error);
		});
});

app.get("/users", (req, res) => {
	User.find({})
		.then((value) => {
			res.send(value);
		})
		.catch((e) => {
			console.log(e);
			res.status(400).send(e);
		})
});

app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	User.findById(id)
		.then((user) => {
			if (!user) {
				return res.status(404).send(user)
			}
			res.send(user)
		})
		.catch((e) => {
			console.log(e);
			res.status(500).send(e);
		})
});

app.post("/tasks", (req, res) => {
	const task = new Task(req.body);
	task.save()
		.then((result) => {
			console.log(result);
			res.status(201).send(result);
		})
		.catch((error) => {
			console.log(error);
			res.status(400).send(error);
		});
});

app.get("/tasks", (req, res) => {
	Task.find()
		.then((tasks) => {
			res.send(tasks);
		})
		.catch((e) => {
			res.status(500).send(e)
		});
});

app.get("/tasks/:id", (req, res) => {
	const { id } = req.params;
	Task.findById(id)
		.then((task) => {
			if (!task) {
				return res.status(404).send(task)
			}
			res.send(task);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
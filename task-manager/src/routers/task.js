const express = require("express");

const Task = require("../models/task");
const { auth } = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id
	})

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

router.get("/tasks", auth, async (req, res) => {

	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (e) {
		console.log(e)
		res.status(500).send(e)
	}
});

router.get("/tasks/:id", auth, async (req, res) => {
	const { id } = req.params;

	try {
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).send(task)
		}
		res.send(task);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
})

router.patch("/tasks/:id", auth, async (req, res) => {
	const { id } = req.params;

	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "completed"];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const task = await Task.findById(id);

		updates.forEach((update) => task[update] = req.body[update]);

		await task.save()

		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
})

router.delete("/tasks/:id", auth, async (req, res) => {
	const { id } = req.params;

	try {
		const task = await Task.findByIdAndDelete(id);

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
})

module.exports = router;
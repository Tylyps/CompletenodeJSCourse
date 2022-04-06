const mongoose = require("mongoose");


const Task = mongoose.model("Task", {
	description: {
		type: String,
		trim: true,
		require: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

// const newTask = new Task({ description: "New task 1", completed: false });

// newTask.save()
// 	.then((v) => {
// 		console.log(v);
// 		console.log(newTask);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	})

module.exports = Task;
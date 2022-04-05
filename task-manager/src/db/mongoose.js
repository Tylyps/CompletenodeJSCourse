const validator = require("validator")
const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL);

const User = mongoose.model("User", {
	name: {
		type: String,
		require: true,
		trim: true
	},
	email: {
		type: String,
		require: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid")
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be a positive number")
			}
		}
	}
});

const me = new User({ name: "Test2", email: "dsa" });

// me.save().then(() => {
// 	console.log(me)
// }).catch((error) => {
// 	console.log("Error!", error)
// })

const Task = mongoose.model("Task", {
	description: {
		type: String,
		trim: true
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
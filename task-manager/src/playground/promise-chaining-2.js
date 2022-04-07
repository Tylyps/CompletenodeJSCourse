require("../db/mongoose");
const Task = require("../models/task");

Task.findByIdAndRemove("624f2cf43a2669a9bc7be1fb")
	.then((result) => {
		console.log(result)
		return Task.countDocuments({ completed: false })
	})
	.then((result) => {
		console.log(result)
	})
	.catch((e) => {
		console.log(e)
	})
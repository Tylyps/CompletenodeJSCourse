require("../db/mongoose");
const User = require("../models/user");

// 624e17d1a1b7a7ff92315df5

User.findByIdAndUpdate("624e17d1a1b7a7ff92315df5", { age: 1 })
	.then((user) => {
		console.log(user)
		return User.countDocuments({ age: 1 })
	})
	.then((result) => {
		console.log(result)
	})
	.catch((e) => {
		console.log(e)
	})
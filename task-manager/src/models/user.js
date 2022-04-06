const mongoose = require("mongoose");
const validator = require("validator");

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
	},
	password: {
		type: String,
		require: true,
		minlength: 7,
		trim: true,
		validate(value = "") {
			if (value.toLowerCase().includes("password")) {
				throw new Error("Password can't contain word password")
			}
		}
	}
});

// const me = new User({ name: "Test", email: "dsa@test.test", password: "p@ss" });

// me.save().then(() => {
// 	console.log(me)
// }).catch((error) => {
// 	console.log("Error!", error)
// })

module.exports = User
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const Task = require("./task");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
    dropDups: true,
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
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}],
	avatar: {
		type: Buffer
	}
}, {
	timestamps: true
})

userSchema.virtual("tasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "owner"
})

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() } , process.env.JWT_SECRET);

	user.tokens = user.tokens.concat({ token });
	await user.save()

	return token;
}

userSchema.methods.getPublicProfile = async function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
}

//Override toJSON function
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;

	return userObject;
}

// Login user via email and password, first check if user with email exist, next compare password, if everything is true return user
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Unable to login");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Unable to login")
	}

	return user
}

// More correct way to use statics
// userSchema.statics.findByCredentials = async function (email, password) {
// 	const user = await this.findOne({ email });

// 	if (!user) {
// 		throw new Error("Unable to login");
// 	}

// 	const isMatch = await bcrypt.compare(password, user.password);

// 	if (!isMatch) {
// 		throw new Error("Unable to login")
// 	}

// 	return user
// }


// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next()
})

// Delete usert tasks when user is removed
userSchema.pre("remove", async function (next) {
	const user = this;

	await Task.deleteMany({ owner: user._id })

	next();
})

const User = mongoose.model("User", userSchema);

// const me = new User({ name: "Test", email: "dsa@test.test", password: "p@ss" });

// me.save().then(() => {
// 	console.log(me)
// }).catch((error) => {
// 	console.log("Error!", error)
// })

module.exports = User
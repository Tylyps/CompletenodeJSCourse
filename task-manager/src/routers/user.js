const express = require("express");
const multer = require("multer");

const User = require("../models/user");
const { auth } = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();

		res.status(201).send({
			user,
			token
		});
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
});

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken()
		console.log(user.toJSON())
		res.send({
			// user: user.getPublicProfile(),
			user,
			token
		})
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
})


const upload = multer({
	dest: "avatars",
	limits: {
		fileSize: 1 * 1000 * 1000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error("Please upload an Image file"));
		}
		cb(undefined, true);
	}
})

router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
	res.send()
})

router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(({token}) => req.token !== token);
		await req.user.save();

		res.send()
	} catch (e) {
		console.log(e);
		res.status(500).send();
	}
})

router.post("/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();

		res.send()
	} catch (e) {
		console.log(e);
		res.status(500).send();
	}
})

router.get("/users/me", auth, async (req, res) => {
	res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
	const { id } = req.params;

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const user = req.user;

		updates.forEach((update) => user[update] = req.body[update]);

		await user.save()

		res.send(user);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

router.delete("/users/me", auth, async (req, res) => {
	try {
		if (!req.user) {
			return res.status(404).send()
		}

		req.user.remove();
		res.send(req.user);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});


module.exports = router
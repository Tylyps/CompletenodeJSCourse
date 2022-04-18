const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase)

test("Should signup a new user", async () => {
	const response = await request(app)
		.post("/users")
		.send({
			name: "Test",
			email: "test@test.test",
			password: "P@ssw0rd"
		})
		.expect(201);

		// Assert that the database was changed correctly
		const user = await User.findById(response.body.user._id);
		expect(user).not.toBeNull();

		// Assertions about the response
		expect(response.body).toMatchObject({
			user: {
				name: "Test",
				email: "test@test.test"
			},
			token: user.tokens[0].token
		});

		expect(user.password).not.toBe("P@ssw0rd")
})

test("Should login existing user", async () => {
	const response = await request(app)
		.post("/users/login")
		.send({
			email: userOne.email,
			password: userOne.password
		}).expect(200);

		const user = await User.findById(response.body.user._id);

		expect(response.body.token).toBe(user.tokens[1].token)
})

test("Should not login nonexistent user", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: "Tekasa@test.test",
			password: "P@ssworrrrrrd!"
		}).expect(400);
})

test("Should get profile for user", async () => {
	await request(app)
		.get("/users/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
})

test("Should not het profile for unauthenticated user", async () => {
	await request(app)
		.get("/users/me")
		.send()
		.expect(401);
})

test("Should delete account for user", async () => {
	const response = await request(app)
		.delete("/users/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

		const user = await User.findById(response.body._id);

		expect(user).toBeNull()
})

test("Should not delete account for unauthenticated user", async () => {
	await request(app)
		.delete("/users/me")
		.send()
		.expect(401);
})

test("Should upload avatar image", async () => {
	await request(app)
		.post("/users/me/avatar")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.attach("avatar", "./tests/fixtures/profile-pic.jpg")
		.expect(200)

		const user = await User.findById(userOneId);

		expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user fields", async () => {
	await request(app)
		.patch("/users/me")
		.send({
			name: "MikeUpdated",
		})
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.expect(200)

		const user = await User.findById(userOneId);

		expect(user.name).toBe("MikeUpdated")
})

test("Should not update invalid user fields", async () => {
	await request(app)
		.patch("/users/me")
		.send({
			name: "MikeUpdated",
			height: 200
		})
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.expect(400)

		const user = await User.findById(userOneId);

		expect(user.name).toBe("Mike")
		expect(user.height).toBeUndefined()
})
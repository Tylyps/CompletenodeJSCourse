const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
	name: "Mike",
	email: "testMike@test.test",
	password: "56what!!"
}

beforeEach(async () => {
	await User.deleteMany();
	await new User(userOne).save();
})

test("Should signup a new user", async () => {
	await request(app)
		.post("/users")
		.send({
			name: "Test",
			email: "test@test.test",
			password: "P@ssw0rd"
		})
		.expect(201)
})

test("Should login existing user", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: userOne.email,
			password: userOne.password
		}).expect(200)
})

test("Should not login nonexistent user", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: "Tekasa@test.test",
			password: "P@ssworrrrrrd!"
		}).expect(400)
})
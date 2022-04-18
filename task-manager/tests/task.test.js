const request = require("supertest");

const { userOne, userTwo, setupDatabase, taskOneId } = require("./fixtures/db");

const app = require("../src/app");
const Task = require("../src/models/task");

beforeEach(setupDatabase)


test("Should create new task for user", async () => {
	const response = await request(app)
		.post("/tasks")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: "New created task for tests"
		})
		.expect(201);

		const task = await Task.findById(response.body._id);

		expect(task).not.toBeNull();
		expect(task.completed).toEqual(false);
})

test("Should get tasks for user", async () => {
	const response = await request(app)
		.get("/tasks")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

		expect(response.body.length).toBe(2);
})

test("Should not delete other users task", async () => {
	const response = await request(app)
		.delete(`/tasks/${taskOneId}`)
		.set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404);

	const task = Task.findById(taskOneId);

	expect(task).not.toBeNull();
})
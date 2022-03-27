// CRUD - create read update delete

const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const { MongoClient, ObjectId } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

const id = new ObjectId()
console.log(id)
console.log(id.getTimestamp())
console.log(id.id)
console.log(id.id.length)
console.log(id.toHexString())
console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		console.log(error);
		console.log("Unable to connect to database!");
		return
	}

	console.log("Connected to database correctly!");
	const db = client.db(databaseName)

	// db.collection("users").insertOne({
	// 	name: "Test10",
	// 	age: 50
	// }, (error, result) => {
	// 	if (error) {
	// 		return console.log("Unable to insert user");
	// 	}

	// 	console.log(result.insertedId)
	// 	console.log(result)
	// })

	// db.collection("users").insertMany([{
	// 	name: "Test4",
	// 	age: 30
	// }, {
	// 	name: "Test5",
	// 	age: 27
	// }], (err, result) => {
	// 	if (error) {
	// 		console.log(error);
	// 		return console.log("Unable to insert documents!");
	// 	};

	// 	console.log(result.insertedIds)
	// })

	// db.collection("tasks").insertMany([{
	// 	description: "Description of task 1",
	// 	completed: false
	// }, {
	// 	description: "Description of task 2",
	// 	completed: true
	// }, {
	// 	description: "Description of task 3",
	// 	completed: false
	// }], (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return console.log("Unable to insert many tasks!")
	// 	}

	// 	console.log("Successfully added many tasks")
	// 	console.log(result.insertedIds)
	// })


})
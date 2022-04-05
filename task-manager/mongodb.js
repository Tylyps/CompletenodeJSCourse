// CRUD - create read update delete

const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const { MongoClient, ObjectId } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		console.log(error);
		console.log("Unable to connect to database!");
		return
	}

	console.log("Connected to database correctly!");
	const db = client.db(databaseName);

	// db.collection("users").updateOne({
	// 	_id: ObjectId("62408a51a5c81e377a7e9196")
	// }, {
	// 	$inc: {
	// 		age: 20
	// 	}
	// })
	// .then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })

	// db.collection("tasks").updateMany({ completed: false }, { $set: { completed: true } })
	// .then((result) => {
	// 	console.log(result)
	// })
	// .catch((err) => {
	// 	console.log(err)
	// })
	// db.collection('users').deleteMany({
	// 	age: 24
	// }).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })
	db.collection("tasks").deleteOne({
		description: "Description of task 2"
	}).then((result) => {
		console.log(result)
	}).catch((error) => {
		console.log(error)
	})
})
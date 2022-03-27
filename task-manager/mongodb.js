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

// 	db.collection("users").findOne({ _id: new ObjectId("62406d73b60e9b51f679d12a") }, (err, user) => {
// 		if (err) {
// 			console.log(err);
// 			return console.log("Unable to fetch User");
// 		}

// 		console.log(user);
// 	})

// 	db.collection("users").find({ age: 24 }).toArray((err, users) => {
// 		if (err) {
// 			console.log(err);
// 			return console.log("Unable to fetch Users");
// 		}

// 		console.log(users);
// 	})
	db.collection("tasks").findOne({ _id: new ObjectId("62408d4abc54b61cb701964a") }, (err, result) => {
		if (err) {
			return console.log(err)
		}

		console.log(result)
	})

	db.collection("tasks").find({ completed: false }).toArray((err, result) => {
		console.log(result)
	})

})
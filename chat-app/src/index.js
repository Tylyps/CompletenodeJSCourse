const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const { generateMessage, generateLocationMessage } = require("./utils/messages");
const {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");


app.use(express.static(publicPath))

// socket.emit -> send event to specific client
// io.emit -> send event for all clients
// socket.broadcast.emit -> send events for all clients except current client
// socket.join -> join to specific room
// io.to.emit -> send event for all clients in specific room
// socket.broadcast.to.emit -> send event for all clients in specific room except current client

io.on("connection", (socket) => {
	console.log("New WebSocket connection")

	socket.on("join", ({ username, room }, callback) => {
		const { user, error } = addUser({
			id: socket.id,
			username,
			room
		})
		if (error) {
			return callback(error)
		}

		socket.join(user.room);

		socket.emit("message", generateMessage("Admin", "Welcome"));
		socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!"`));

		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room)
		})
		callback();

		// socket.on("sendMessage", (message, callback) => {
		// 	const filter = new Filter();

		// 	if (filter.isProfane(message)) {
		// 		return callback("Profanity is not allowed!");
		// 	}

		// 	io.to(room).emit("message", generateMessage(message));
		// 	if (callback) {
		// 		callback();
		// 	}
		// })

		// socket.on("sendLocation", (location, callback) => {
		// 	io.to(room).emit("locationMessage", generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`))

		// 	if (callback) {
		// 		callback()
		// 	}
		// })

		// socket.on("disconnect", () => {
		// 	io.to(room).emit("message", generateMessage("A user has left!"));
		// })
	})

	socket.on("sendMessage", (message, callback) => {
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return callback("Profanity is not allowed!");
		}

		const user = getUser(socket.id);

		io.to(user.room).emit("message", generateMessage(user.username, message));
		if (callback) {
			callback();
		}
	})

	socket.on("sendLocation", (location, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit("locationMessage", generateLocationMessage(user.username, `https://google.com/maps?q=${location.latitude},${location.longitude}`))

		if (callback) {
			callback()
		}
	})

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit("message", generateMessage("Admin", `${user.username} has left!`));
			io.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room)
			})
		}
	})
})

server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
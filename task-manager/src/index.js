const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {

// 	if (req.method === "GET") {
// 		res.status(403).send("Get request are disabled")
// 	} else {
// 		next();
// 	}
// })

app.use((req, res, next) => {
	res.status(503).send("Work in progress, try later.")
})

//Middleware
app.use(express.json())

//App routes
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

const jwt = require("jsonwebtoken")

const myFunction = async () => {
	const token = jwt.sign({ _id: "6250b97129ce90a91228a1ae" }, "thisismynewcourse", { expiresIn: "1 second" });
	console.log(token);

	const data = jwt.verify(token, "thisismynewcourse");
	console.log(data)
};

myFunction()
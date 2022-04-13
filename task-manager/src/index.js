const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;


// const multer = require("multer");
// const upload = multer({
// 	dest: "images"
// })

// app.post("/upload", upload.single("upload"), (req, res) => {
// 	res.send()
// })


//Middleware
app.use(express.json())

//App routes
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

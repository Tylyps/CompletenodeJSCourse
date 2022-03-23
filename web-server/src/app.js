const path = require("path")
const express = require("express");

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express();
const publicPath = path.join(__dirname, "../public")
let test = 0;

app.use(express.static(publicPath))

app.get("/weather", (req, res) => {
	res.send({
		forecast: "forecastTest",
		location: "40,70"
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
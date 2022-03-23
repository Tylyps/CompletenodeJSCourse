const path = require("path")
const express = require("express");

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express();
const publicPath = path.join(__dirname, "../public");
let test = 0;

app.set("view engine", "hbs");

app.use(express.static(publicPath))

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Test Testing"
	})
})

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About App",
	})
})

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help App",
		message: "Test message"
	})
})

app.get("/weather", (req, res) => {
	res.send({
		forecast: "forecastTest",
		location: "40,70"
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
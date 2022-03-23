const path = require("path")
const express = require("express");

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express();

let test = 0;

// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
	test++;
	res.render("index", {
		title: "Weather App",
		name: "Test Testing",
		test
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
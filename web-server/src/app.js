const path = require("path")
const express = require("express");
const hbs = require("hbs");

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express();

let test = 0;

// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

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
		name: "Test Testing",
	})
})

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help App",
		message: "Test message",
		name: "Test Testing",
	})
})

app.get("/weather", (req, res) => {
	res.send({
		forecast: "forecastTest",
		location: "40,70",
		name: "Test Testing",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
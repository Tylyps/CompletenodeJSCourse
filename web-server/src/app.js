const path = require("path")
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address to get a weather"
		})
	}

	geocode(req.query.address, (err, data = {}) => {
		if (err) {
			return res.send({
				error: err,
				errorMessage: "Error while finding a location"
			})
		}

		const {
			latitude,
			longtude,
			location
		} = data

		forecast(latitude, longtude, (err, data = {}) => {
			if (err) {
				return res.send({
					error: err,
					errorMessage: "Error while geting a weather to location"
				})
			}

			return res.send({
				location,
				forecast: data
			})
		})
	})
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term"
		})
	}
	console.log(req.query)
	res.send({
		products: []
	})
})

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "Error 404",
		errorMessage: "Help article not found",
		name: "Test Testing",
	})
})

app.get("*", (req, res) => {
	res.render("404", {
		title: "Error 404",
		errorMessage: "Page not found",
		name: "Test Testing",
	})
})

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
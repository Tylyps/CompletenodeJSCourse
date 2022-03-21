const express = require('express');

const app = express();
let test = 0;

app.get("", (req, res) => {
	test++
	res.send(`<h1>Weather ${test}</h1>`);
});

app.get("/help", (req, res) => {
	res.send({
		name: "Test",
		age: 99
	});
});

app.get("/about", (req, res) => {
	res.send("<h1>About</h1>");
});

app.get("/weather", (req, res) => {
	res.send({
		forecast: "forecastTest",
		location: "40,70"
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
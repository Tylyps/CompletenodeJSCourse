const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Boston", (err, data) => {
	console.log("Error", err);
	console.log("Data", data);

});

forecast(44.1545, -75.7088, (err, data) => {
	console.log("Error", err);
	console.log("Data", data);
});
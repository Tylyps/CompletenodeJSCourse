const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2]

if (!address) {
	console.log("Please provide an address")
} else {
	geocode(address, (err, {letitude, longtude, location} = {}) => {
		if (err) {
			return console.log(err)
		}

		console.log("Data", { letitude, location, longtude });

		forecast(letitude, longtude, (err, forecastData) => {
			if (err) {
				return console.log(err)
			}

			console.log("ForecastData", forecastData);

			console.log(location);
			console.log(forecastData);
		});

	});

}

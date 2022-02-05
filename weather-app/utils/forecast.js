const request = require('request')


const forecast = (latitude, longtude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${latitude},${longtude}`

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to weather service!", undefined)
		} else if (response.body.error) {
			callback("Unable to check weather!", undefined);
		} else {
			const current = response.body.current;
			callback(undefined, {
				weatherDescriptions: current.weather_descriptions,
				temperature: current.temperature
			});
		}
	})

};

module.exports = forecast
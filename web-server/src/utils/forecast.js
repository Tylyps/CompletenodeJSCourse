const request = require('request')


const forecast = (latitude, longtude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${latitude},${longtude}&unit=m`

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to weather service!", undefined)
		} else if (body.error) {
			callback("Unable to check weather!", undefined);
		} else {
			const current = body.current;
			callback(undefined, {
				weatherDescriptions: current.weather_descriptions,
				temperature: current.temperature
			});
		}
	})

};

module.exports = forecast
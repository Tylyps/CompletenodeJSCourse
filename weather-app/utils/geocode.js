const request = require("request")


const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${mapKey}`

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to location services!", undefined);
		} else if (response.body.features == undefined || response.body.features.length === 0) {
			console.log(response)
			callback("Unable to find location. Try another search!", undefined);
		} else {
			const features = response.body.features[0];
			callback(undefined, {
				latitude: features.center[0],
				longtude: features.center[1],
				location: features.place_name
			})
		}
	});

};

module.exports = geocode
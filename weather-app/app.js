const request = require('request')
const geocode = require("./utils/geocode");

// request({ url: weatherUrl, json: true }, (error, response) => {
// 	if (error) {
// 		console.log("Unable to connect to weather service!");
// 	} else if (response.body.error) {
// 		console.log("Unable to find location!");
// 	} else {
// 		const current = response.body.current
// 		console.log(current.weather_descriptions + ". It is currently " + current.temperature)
// 	}
// })

// request({ url: mapUrl, json: true }, (error, response) => {
// 	if (error) {
// 		console.log("Unable to connect to location services!");
// 	} else if (response.body.features == undefined || response.body.features.length <= 0) {
// 		console.log("Unable to find location! Try different search phrase");
// 	} else {
// 		console.log(response.body.features[0].center);
// 		const latitude = response.body.features[0].center[1];
// 		const longtude = response.body.features[0].center[0];

// 		console.log("latitude " + latitude + ", longtude" + longtude);
// 	}
// });


geocode("Boston", (err, data) => {
	console.log("Error", err);
	console.log("Data", data);

});
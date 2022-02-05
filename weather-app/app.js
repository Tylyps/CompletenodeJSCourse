const request = require('request')

// const url = "https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6"

// request({ url, json: true }, (error, response) => {
// 	console.log(response)
// })

const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=pk.eyJ1IjoibWNza25lcnVzIiwiYSI6ImNrejU0cGx4aTBhcmoydXF3cWp3c2w2MTAifQ.ktlFLIA6AJb5kYaouasWwg"

request({ url: mapUrl, json: true }, (error, response) => {
	console.log(response.body.features[0].center);
	const latitude = response.body.features[0].center[1];
	const longtude = response.body.features[0].center[0];

	console.log("latitude " + latitude + ", longtude" + longtude);
});
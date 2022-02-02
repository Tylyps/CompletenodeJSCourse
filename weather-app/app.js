const request = require('request')

const url = "https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6"

request({ url, json: true }, (error, response) => {
	console.log(response)
})
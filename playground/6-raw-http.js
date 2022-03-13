const http = require("http")

const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${45},${-75}`

const request = http.request(url, (response) => {
	let data = ""
	response.on("data", (chunk) => {
		console.log(chunk)
		data = data + chunk.toString()
	})

	response.on('end', () => {
		console.log(data)
		const body = JSON.parse(data)
		console.log(body)
	})
})

request.on("error", (error) => {
	console.log("An error", error)
})

request.end()
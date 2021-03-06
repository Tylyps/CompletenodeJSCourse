const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault()
	console.log(search.value)

	messageOne.textContent = "Loading..."
	messageTwo.textContent = ""
	fetch(`/weather?address=${search.value}`)
	.then((res) => {
		return res.json()
	})
	.then((data) => {
		if (data.error) {
			messageOne.textContent = data.error
			console.log(data.error)
		} else {
			messageOne.textContent = data.location
			messageTwo.textContent = `Weather is ${data.forecast.weatherDescriptions}. Temperature is ${data.forecast.temperature}`
			console.log(data.location)
			console.log(data.forecast)
		}
	})
})
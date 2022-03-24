const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault()
	console.log(search.value)

	fetch(`/weather?address=${search.value}`)
	.then((res) => {
		return res.json()
	})
	.then((data) => {
		if (data.error) {
			console.log(data.error)
		} else {
			console.log(data.location)
			console.log(data.forecast)
		}
	})
})
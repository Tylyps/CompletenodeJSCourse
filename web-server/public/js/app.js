fetch("/weather?address=warszawa")
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
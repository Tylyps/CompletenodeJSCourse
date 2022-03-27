const doWorkPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Success")
	}, 4000);
});

doWorkPromise.then((result) => {
	console.log(result)
}).catch((error) => {
	console.log(error)
})


//
//																fulfilled
//															/
//	Promise				-- pending ->
//															\
//																rejected
//
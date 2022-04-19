// const btn = document.querySelector("#increment");
const chatContainer = document.querySelector("#chatContainer");
const socket = io();
const form = document.querySelector("#message-form");
const input = document.querySelector("input");
const formBtn = form.querySelector("button");
const locationBtn = document.querySelector("#send-location");

// socket.on("countUpdated", (count) => {
// 	console.log("The count has been updated! ", count);
// });

// btn.addEventListener("click", () => {
// 	console.log("Clicked")
// 	socket.emit("Increment")
// })

socket.on("message", (message) => {
	console.log(message)
	const h = document.createElement("h4");
	h.textContent = message;
	chatContainer.appendChild(h);
	chatContainer.scrollTo(0, chatContainer.scrollHeight)
})



form.addEventListener("submit", (e) => {
	e.preventDefault();

	const message = input.value.trim();
	if (!message) {
		return
	}

	formBtn.setAttribute("disabled", "disabled");

	socket.emit("sendMessage", message, (error) => {
		formBtn.removeAttribute("disabled");
		if (error) {
			return console.log(error);
		}
		console.log(message)
	});
	input.value = "";
	input.focus();
})

locationBtn.addEventListener("click", (e) => {
	if (!navigator.geolocation) {
		return alert("Geolocation is not supported by your browser");
	}

	locationBtn.setAttribute("disabled", "disabled");
	navigator.geolocation.getCurrentPosition((position) => {
		console.log(position)
		const location = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}
		socket.emit("sendLocation", location, (error) => {
			locationBtn.removeAttribute("disabled");
			if (error) {
				return console.log(error);
			}

			console.log("Location shared!")
		});
	})
})
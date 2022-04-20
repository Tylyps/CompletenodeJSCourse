const socket = io();
// const btn = document.querySelector("#increment");
//Elements
const chatContainer = document.querySelector("#messages");
const form = document.querySelector("#message-form");
const input = document.querySelector("input");
const formBtn = form.querySelector("button");
const locationBtn = document.querySelector("#send-location");
const sidebar = document.querySelector("#sidebar");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// socket.on("countUpdated", (count) => {
// 	console.log("The count has been updated! ", count);
// });

// btn.addEventListener("click", () => {
// 	console.log("Clicked")
// 	socket.emit("Increment")
// })

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const getFormatedTime = (timestamp) => {
	return moment(timestamp).format("HH:mm")
}

const autoscroll = () => {
	// New message element
	const newMessage = chatContainer.lastElementChild;

	// Height of the new message
	const newMessageStyles = getComputedStyle(newMessage);
	const newMessageMargin = parseInt(newMessageStyles.marginBottom);
	const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

	//Visible height
	const visibleHeight = chatContainer.offsetHeight;

	// Height of mesages container
	const containerHeight = chatContainer.scrollHeight;

	// How far have i scrolled?
	const scrollOffset = chatContainer.scrollTop + visibleHeight;

	if (containerHeight - newMessageHeight <= scrollOffset) {
		chatContainer.scrollTo(0, chatContainer.scrollHeight)
	}
}

socket.on("message", (message) => {
	console.log(message)
	const html = Mustache.render(messageTemplate, { message: message.text, createdAt: getFormatedTime(message.createdAt), username: message.username });
	chatContainer.insertAdjacentHTML("beforeend", html)
	autoscroll()

	// const h = document.createElement("h4");
	// h.textContent = message;
	// chatContainer.appendChild(h);
	// chatContainer.scrollTo(0, chatContainer.scrollHeight)
})

socket.on("locationMessage", ({ url, createdAt, username }) => {
	console.log(url);
	const html = Mustache.render(locationTemplate, { url, createdAt: getFormatedTime(createdAt), username });
	chatContainer.insertAdjacentHTML("beforeend", html)
	autoscroll()
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

socket.emit("join", { username, room }, (error) => {
	console.log(error);
	if (error) {
		alert(error);
		location.href = "/"
	}
})

socket.on("roomData", ({ room, users }) => {
	const html = Mustache.render(sidebarTemplate, {
		room,
		users
	})
	sidebar.innerHTML = html;
})
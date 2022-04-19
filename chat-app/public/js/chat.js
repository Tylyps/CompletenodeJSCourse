const btn = document.querySelector("#increment");
const socket = io();

socket.on("countUpdated", (count) => {
	console.log("The count has been updated! ", count);
});

btn.addEventListener("click", () => {
	console.log("Clicked")
	socket.emit("Increment")
})


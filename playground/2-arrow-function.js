// const square = function (x) {
// 	return x * x;
// };

// const square = (x) => {
// 	return x * x;
// };

// const square = (x) => x * x;
// console.log(suqre(3))

const event = {
	name: "BIrhtday party",
	guestList: ["1", "2", "3"],
	// printGuestList: function() { good
	// 	console.log("Guest list for " + this.name);
	// }
	// printGuestList: () => { bad
	// 	console.log("Guest list for " + this.name);
	// }
	printGuestList() { // best
		console.log("Guest list for " + this.name);

		// this.guestList.forEach(function (guest) { bad
		// 	console.log(guest + " is attending" + this.name);
		// });
		this.guestList.forEach((guest) => { // good
			console.log(guest + " is attending" + this.name);
		});
	}
}

event.printGuestList();
const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
	return "Your notes...";
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.bold.blue.inverse("Your notes"))
	notes.forEach((note, i) => {
		console.log(`Note ${i + 1}: ${chalk.blue(note.title)}`);
	})
}

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push({
			title,
			body
		});

		saveNotes(notes);

		console.log(chalk.green.inverse("New note added!"));
	} else {
		console.log(chalk.red.inverse("Note title taken!"));
	}

};

const removeNote = (title) => {
	const notes = loadNotes();
	const notesToKeep = notes.filter((note) => note.title !== title);

	if(notes.length !== notesToKeep.length) {
		saveNotes(notesToKeep);
		console.log(chalk.green.inverse("Note removed successfully"));
	} else {
		console.log(chalk.red.inverse("Note with that title does not exist"));
	}
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	};
};

const saveNotes = (notes = []) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
}

module.exports = {
	getNotes,
	addNote,
	removeNote,
	listNotes
};
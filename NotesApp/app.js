const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

//Create add command
yargs.command({
  command: 'add',
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler: (argv) => {
		notes.addNote(argv.title, argv.body);
  }
})

//Create remove command
yargs.command({
  command: 'remove',
  describe: "Remove a note",
  handler: () => {
    console.log("Remove the note")
  }
})

//Create list command
yargs.command({
  command: "list",
  describe: "Display a list of notes",
  handler: () => {
    console.log("Notes list");
  }
})

//Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: () => {
    console.log("Read the note");
  }
})

yargs.parse()

// console.log(process.argv);
// console.log(yargs.argv);
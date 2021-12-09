const chalk = require("chalk");
const yargs = require("yargs");
const getNotes = require("./notes");

//Create add command
yargs.command({
  command: 'add',
  describe: "Add a new note",
  handler: (a) => {
    console.log("Adding a new note!", a)
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

console.log(process.argv);
console.log(yargs.argv);
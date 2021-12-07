// const validator = require("validator");
const getNotes = require("./notes");
const chalk = require("chalk");

console.log(getNotes());

console.log(chalk.bold.green("Success!"))

// console.log(validator.isEmail("test@test.test"))

// const add = require("./utils.js");
// console.log(add(1,2));
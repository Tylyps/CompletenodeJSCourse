const validator = require("validator");
const getNotes = require("./notes");

console.log(getNotes());

console.log(validator.isEmail("test@test.test"))

// const add = require("./utils.js");
// console.log(add(1,2));
const fs = require("fs");

// const book = {
//   title: "Ego is the Enemy",
//   author: "Rayan Holiday"
// }

// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);
// fs.writeFileSync('1-json.json', bookJSON);


// const parsedData = JSON.parse(bookJSON);
// console.log(parsedData.author);

// const dataBuffer =  fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const dataBuffer = fs.readFileSync("1-json.json");
const data = JSON.parse(dataBuffer.toString());

data.name = "TEST";
data.age = 24;

console.log(data);
const dataToSave = JSON.stringify(data);
fs.writeFileSync("1-json.json", dataToSave);
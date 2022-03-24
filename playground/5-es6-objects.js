// Object property shorthand
const name = "Test";
const userAge = 25;

// const user = {
// 	name: name,
// 	age: userAge,
// 	location: "Warsaw"
// }

const user = {
	name,
	age: userAge,
	location: "Warsaw"
};

//Object destructuring

const product = {
	label: "Red notebook",
	price: 3,
	stock: 201,
	salePrice: undefined
};

// const label = product.label;
// const stock = product.stock;

const { label: productLabel, stock, rating = 5 } = product;

console.log(productLabel)
console.log(stock)
console.log(rating)

const transaction = (type, { label, stock = 0 } = {}) => {
	console.log(label)
}

transaction("order", product)
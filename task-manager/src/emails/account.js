const sgMail = require("@sendgrid/mail");

const sendgridAPIkey = process.env.SEND_GRID_KEY2;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "test@test.test",
		subject: "Thanks for joining in!",
		text: `Welcome to the app, ${name}. LEt me know how you get along with the app.`
	})
}

const sendCancelationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "test@test.test",
		subject: "Your accout was deleted",
		text: `${name}, your account was deleted. Could you let us know what can we improve in our app to be better.`
	})
}

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail
}
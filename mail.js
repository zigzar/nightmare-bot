// Recieve all messages from email

const mail = require("node-mail-client");

const fs = require("fs");

let mailNumber = 10;

let m = new mail({
	user: `figra${mailNumber}@rambler.ru`,
	pass: "*********",
	imap: ["imap.rambler.ru", 993],
	smtp: ["smtp.rambler.ru", 465],
	name: "1 1",
});

async function getLetters() {
	let total;
	let success = true;
	await m
		.receive((total) => `1:${total}`)
		.then((result) => {
			for (i = 0; i < result.length; i++)
				console.log(JSON.stringify(result[i].header.subject[0]));
		})
		.catch((err) => {
			console.log(err);
			console.log("\nTrying again:");
			success = false;
		});
	return success;
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isDone() {
	let success = await getLetters();
	while (!success) await delay(3000).then(() => getLetters());
}

isDone();

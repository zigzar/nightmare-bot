const Nightmare = require("nightmare");

var fs = require("fs");
//var proxyList = fs.readFileSync('proxy.txt').toString().split('\r\n');

var regularNightmare;
function newNight(mail) {
	regularNightmare = Nightmare({
		// switches: {
		//   'proxy-server': proxy // set the proxy server here ...
		// },
		show: true,
	});

	regularNightmare
		//.authentication("Ubm1Cl", "hpvAys8gBP")
		.goto("https://mail.rambler.ru")
		.wait("#login")
		.insert("#login", `figra${mail}@rambler.ru`)
		.insert("#password", "Wxh9mgmX")
		.click('button[type="submit"]')
		.wait('button[data-list-view="newletter"]')
		.wait(5000)
		.screenshot("screenshots/")
		.end()
		.then((ip) => {
			// This will log the your local IP
			console.log("local IP: " + ip + "\nMail: figra" + mail + "@rambler.ru");
		})
		.catch((error) => {
			console.error("Ошибка:", error);
		});
}

async function magic() {
	for (i = 0; i < 1; i++) {
		await newNight(i + 1);
	}
}

magic();

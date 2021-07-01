// Check ip using yandex
const Nightmare = require("nightmare");

var fs = require("fs");
var proxyList = fs.readFileSync("proxy.txt").toString().split("\r\n");

var regularNightmare;
function newNight(proxy, mail) {
	regularNightmare = Nightmare({
		switches: {
			"proxy-server": proxy,
		},
		show: true,
	});

	regularNightmare
		.authentication("Ubm1Cl", "hpvAys8gBP")
		.goto("https://yandex.ru")
		.insert(
			'input[class="input__control input__input mini-suggest__input"]',
			"мой ip"
		)
		.click(
			'button[class="button mini-suggest__button button_theme_search button_size_search i-bem button_js_inited"]'
		)
		.wait("div.fact")
		.wait(5000)
		.evaluate(() =>
			document
				.querySelector('td[class="table__cell"]:last-child')
				.innerText.replace(/[^\d\.]/g, "")
		)
		.end()
		.then((ip) => {
			console.log("local IP: " + ip + "\nMail: figra" + mail + "@rambler.ru");
		})
		.catch((error) => {
			console.error("Ошибка:", error);
		});
}

async function magic() {
	for (i = 0; i < 1; i++) {
		await newNight(proxyList[i], i + 1);
	}
}

magic();

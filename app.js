// TODO:
// ----- 1 Дописать все действия для формы
// ----- 2 Реализовать парсинг ответов из .txt
// ----- 3 Добавить прокси
// ----- 4 Добавить почты

// 'div[class="SuccessfulSubmission--default"]'

const Nightmare = require("nightmare");
var nightmare;

var fs = require("fs");
var proxyList = fs.readFileSync("proxy.txt").toString().split("\r\n");

const delay = 1 * 60 * 1000;

let f1_why = [
	"Pigments are known all over the world",
	"The best pigments Large concern for the production of pigments, large assortment, good quality",
	"Quality proven over the years",
	"Largest selection of pigments I like to work with these pigments",
	" I use these pigments in my work",
	"Good value for money",
	"I love these pigments very much",
	"Many craftsmen work with these pigments and are satisfied with the quality",
	"I think these are the best pigments and I like to work with",
	"I am very pleased with the quality of these pigments, I use them in my work",
	"Time-tested quality. I love them",
	"Large selection of colors and it is convenient for me to work with them",
	"These pigments are easy to buy in any country",
	"Very nice pigments, good palette I like the choice of colors",
	"Good healed results. I like it",
	"I use these pigments in my work and I like the result",
	"For me its the best pigments in the world",
];
let f1_name = ["World famous", "Intenze", "Permablend", "Eternal"];
let f2_why = [
	"The best pigments Large concern for the production of pigments, large assortment, good quality",
	"Quality proven over the years",
	"Largest selection of pigments I like to work with these pigments",
	"I use these pigments in my work",
	"Good value for money",
	"I love these pigments very much",
	"Many craftsmen work with these pigments and are satisfied with the quality.",
	"I think these are the best pigments and I like to work with",
	"I am very pleased with the quality of these pigments, I use them in my work.",
	"Time-tested quality. I love them",
	"Large selection of colors and it is convenient for me to work with them",
	"These pigments are easy to buy in our country",
	"Very nice pigments, good palette I like the choice of colors",
	"Good healed results. I like it",
	"I use these pigments in my work and I like the result",
];
let f2_name = [
	"BB color",
	"Be bright",
	"Icolor",
	"Permablend Tina Davis",
	"AS for PMU",
	"Ne pigments by Nechaeva",
	"Brovi",
	"Contour",
];
let f3_why = [
	"The best pigment for smp",
	"Perfect pigment for smp",
	"I really enjoy working with these pigments",
	" Very good healed result",
	"Good results after healing",
	"Perfect black for the scalp ideal black",
	"Convenient dilution chart I like working with this pigment. Nice results",
	"Good results over time I am pleased that I have chosen this pigment in my work",
	"I like the quality of this pigment",
	"Good product, I love it at work",
	"My trainer works with this pigment and I trust him that its good choice",
	"I want to nominate this pigment because I like the quality",
	"Best pigment for scalp micropigmentation",
	"Ideal pigment for scalp micropigmentation",
	" I use this pigment in my work for smp and really like the results",
];
let f3_name = ["5 pm", "Folicule", "5 pm shadow smp pigment", "Alivio"];
let f4_why = [
	"Best quality. I like it",
	"I use this machine everyday",
	"Very reliable machine",
	"The best machine in the world ",
	"High-quality machine helps in work",
	"The Best machine in the world. I like it",
];
let f4_name = [
	"Bellar",
	"Spektra Flux",
	"Apollo",
	"Xion",
	"Xion S",
	"Spektra Flux S",
	"Spektra Xion",
	"Cheyenne Sol Nova Pen",
	"Cheyenne Sol Nova Unlimited",
	"Bishop SMP",
	"Bishop Packer Wand",
	"Bishop Shader Wand",
];
let f5_why = ["I use in work and I really like", "Good quality and I like it"];
let f5_name = ["Kwadron", "EZ", "Envy", "Bishop", "Fyt"];
let f6_why = [
	"I like this forum for sharing experiences",
	"I like to communicate with colleagues",
	"Colleagues show their work on the forum",
	"A lot of cases of work there",
	"A lot of information on forum",
	"A lot of information on forum and I like it",
];
let f6_name = [
	"Team micro international community",
	"Micropigmentation connect",
	"Permanent make-up & microblading Alliance",
];
let f7_why = [
	"Very good SMP course, a lot of information and followed by coach support",
];
let f7_name = [
	"Scalp Expert. Online Scalp micropigmentation course for pmu masters",
];
let f8_why = [
	"Good remover, I like to use",
	"Good quality and I like to use",
	"Good results, nice product",
];
let f8_name = ["Tattoo off", "Rejuvi", "CRC"];
let f9_why = [
	'I want to nominate Elena Kruglova "Scalp Expert" for contribution to the development of the Scalp micropigmentation industry in Russia',
	"Elena Kruglova is the only specialist in Russia who works in the SMP technique and shows the results of work. Because here we did not know before about this",
	"Elena Kruglova helps people with baldness to feel confident in themselves and shows this",
	"Very good person, specialist and coach",
	"Elena teaches the SMP technique first and just one in Russia",
	"Elena Kruglova shows how to solve the issue of baldness. The Best master and coach in Russia",
	"Elena develops SMP and attends congresses, very professional and just one in Russia",
	"Elena is a speaker of conferences, very professional in this industry. She shows people how it is possible to solve the problem of baldness with the help of the SMP technique. In Russia this direction was not previously known",
	"I like Elena very much and very grateful to her. She helps people feel confident and beautiful",
	"Scalp Expert Approved clinic and certified by Team Micro",
	"Just one clinic in Russia who approved and certified by Team Micro",
];
let f9_name = ['Elena Kruglova "Scalp Expert"'];
let f10_why = [
	"Elena Kruglova for the development of the SMP industry in Russia and helping people with alopecia problem",
];
let f10_name = ['Elena Kruglova "Scalp Expert"'];
let inst = [
	"https://www.instagram.com/permanent_kruglova/",
	"https://www.instagram.com/trihopigmentacia/",
];

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function newNight(proxy, mailNumber) {
	nightmare = Nightmare({
		switches: {
			"proxy-server": proxy,
		},
		waitTimeout: 5000,
		typeInterval: 50,
		show: false,
	});
	nightmare
		.authentication("Ubm1Cl", "hpvAys8gBP")
		.goto("https://wmca-industry.paperform.co")
		.wait('div[aria-label="Worlds best pigment range"]')
		.click('div[aria-label="Worlds best pigment range"]')
		.type(
			'textarea[data-fieldkey="d5fql"]',
			f1_why[getRandomInt(0, f1_why.length)]
		)
		.type(
			'input[data-fieldkey="431mo"]',
			f1_name[getRandomInt(0, f1_name.length)]
		)

		.click('div[aria-label="Worlds best signature pigment range"]')
		.type(
			'textarea[data-fieldkey="fkaem"]',
			f2_why[getRandomInt(0, f2_why.length)]
		)
		.type(
			'input[data-fieldkey="9091d"]',
			f2_name[getRandomInt(0, f2_name.length)]
		)

		.click('div[aria-label="Worlds best black pigment"]')
		.type(
			'textarea[data-fieldkey="519qb"]',
			f3_why[getRandomInt(0, f3_why.length)]
		)
		.type(
			'input[data-fieldkey="cjiqk"]',
			f3_name[getRandomInt(0, f3_name.length)]
		)

		.click('div[aria-label="Worlds best machine"]')
		.type(
			'textarea[data-fieldkey="bi7e6"]',
			f4_why[getRandomInt(0, f4_why.length)]
		)
		.type(
			'input[data-fieldkey="ec2if"]',
			f4_name[getRandomInt(0, f4_name.length)]
		)

		.click('div[aria-label="Worlds best digital or manual handpiece"]')
		.type(
			'textarea[data-fieldkey="2cibm"]',
			f5_why[getRandomInt(0, f5_why.length)]
		)
		.type(
			'input[data-fieldkey="er8jn"]',
			f5_name[getRandomInt(0, f5_name.length)]
		)

		.click('div[aria-label="Worlds best social media forum"]')
		.type(
			'textarea[data-fieldkey="vd48"]',
			f6_why[getRandomInt(0, f6_why.length)]
		)
		.type(
			'input[data-fieldkey="a15nh"]',
			f6_name[getRandomInt(0, f6_name.length)]
		)

		.click('div[aria-label="Worlds best webinar"]')
		.type(
			'textarea[data-fieldkey="bh2h5"]',
			f7_why[getRandomInt(0, f7_why.length)]
		)
		.type(
			'input[data-fieldkey="4urg0"]',
			f7_name[getRandomInt(0, f7_name.length)]
		)
		.type('input[data-fieldkey="ca880"]', "http://trihopigmentacia.ru/")

		.click('div[aria-label="Worlds best removal system"]')
		.type(
			'textarea[data-fieldkey="5jk2p"]',
			f8_why[getRandomInt(0, f8_why.length)]
		)
		.type(
			'input[data-fieldkey="ptba"]',
			f8_name[getRandomInt(0, f8_name.length)]
		)

		.click('div[aria-label="Outstanding contribution to the industry award"]')
		.type(
			'textarea[data-fieldkey="q9od"]',
			f9_why[getRandomInt(0, f9_why.length)]
		)
		.type(
			'input[data-fieldkey="cml39"]',
			f9_name[getRandomInt(0, f9_name.length)]
		)
		.type(
			'input[data-fieldkey="9qj5b"]',
			"https://www.instagram.com/trihopigmentacia/"
		)

		.click('div[aria-label="Lifetime achievement award"]')
		.type(
			'textarea[data-fieldkey="9j99p"]',
			f10_why[getRandomInt(0, f10_why.length)]
		)
		.type(
			'input[data-fieldkey="1qllv"]',
			f10_name[getRandomInt(0, f10_name.length)]
		)
		.type('input[data-fieldkey="cmers"]', inst[getRandomInt(0, inst.length)])

		.type('input[data-fieldkey="c6tei"]', `figra${mailNumber}@rambler.ru`)
		.type('input[data-fieldkey="4bsrh"]', `figra${mailNumber}@rambler.ru`)

		.click('span[data-testid="submitbutton"]')

		.wait('div[class="SuccessfulSubmission--default"]')
		.end()
		.then(console.log(mailNumber + " - запущен"))
		.catch((error) => {
			console.error("Ошибка:", error);
			fs.appendFileSync("data.txt", mailNumber + " ");
		});
}

async function make10Forms(start) {
	for (counter = start; counter < start + 10; counter++) {
		await newNight(proxyList[counter], counter + 1);
	}
}

function makeForms(from, to) {
	let i = from;
	setTimeout(function go() {
		make10Forms(i);
		if (i < to - 1) {
			setTimeout(go, delay);
		}
		i += 1;
	}, delay);
}

make10Forms(0);
setTimeout(() => {
	makeForms(2, 200);
}, delay);

//  let p = (1/f1_why.length)*(1/f1_name.length)*(1/f2_why.length)*(1/f2_name.length)*(1/f3_why.length)*(1/f3_name.length)*(1/f4_why.length)*(1/f4_name.length)*(1/f5_why.length)*(1/f5_name.length)*(1/f6_why.length)*(1/f6_name.length)*(1/f7_why.length)*(1/f7_name.length)*(1/f8_why.length)*(1/f8_name.length)*(1/f9_why.length)*(1/f9_name.length)*(1/f10_why.length)*(1/f10_name.length)*(1/inst.length);
//  console.log("Вероятность: " + p*100 + "%");

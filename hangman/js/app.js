//libraries
let dictionary = [
	'phlegm', 
	'deciduous', 
	'conscientious', 
	'daiquiri', 
	'exhilarate', 
	'hierarchy', 
	'mischievous',
	'questionnaire',
	'diarrhea',
	'awkward',
	'bagpipes',
	'fjord',
	'haphazard',
	'jukebox',
	'memento',
	'numbskull',
	'ostracize',
	'rhythmic',
	'wildebeest'
];

//other global lets
let key = document.getElementsByClassName("key");
let currentWord;
let currentWordArray;
let makeListeners = function() {clickButton(this.getAttribute("id"));};
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let numWrong = 0;

(function () { //create new game on site load
	newGame();
})();

document.onkeypress = function(e) { //keyboard press listener
	clickButton(e.key);
	toggleActive(e.code, 'keyDown'); //adds active class to keys
}

document.onkeyup = function(e) { //removes active class from keys
	toggleActive(e.code, 'keyUp');
}

for (let i = 0; i < key.length; i++) { //put a click listener on each key
	key[i].addEventListener('click', makeListeners, false);
	key[i].addEventListener('mousedown', function(){
											this.classList.add('active');
											});
	key[i].addEventListener('mouseup', function(){
											this.classList.remove('active');
											});
}

function toggleActive(whichKey, upOrDown) { //show onscreen which keys are being pressed
	if (document.getElementById(whichKey) != null && upOrDown == 'keyDown'){
		document.getElementById(whichKey).classList.add('active');
	} else if (document.getElementById(whichKey) != null && upOrDown == 'keyUp') {
		document.getElementById(whichKey).classList.remove('active');
	}
}

function clickButton(buttonId) { //converts clicks and keypresses into letters
	if (buttonId != 'newGame' && 
		(document.getElementById('win').className).indexOf('hidden') != -1 &&
		(document.getElementById('lose').className).indexOf('hidden') != -1) {
		checkAnswer(buttonId.substr(buttonId.length-1).toLowerCase());
	} else if (buttonId == 'newGame') {
		newGame();
	}
}

function drawHangman(wrongNum) {
	switch (wrongNum) {
		case 1:
			ctx.beginPath();
			ctx.arc(100, 50, 25, 0, Math.PI * 2, false);
			ctx.stroke();
			break;
		case 2:
			ctx.beginPath();
			ctx.moveTo(100, 75);
			ctx.lineTo(100, 175);
			ctx.stroke();
			break;
		case 3:
			ctx.beginPath();
			ctx.moveTo(100, 175);
			ctx.lineTo(75, 225);
			ctx.stroke();
			break;
		case 4:
			ctx.beginPath();
			ctx.moveTo(100, 175);
			ctx.lineTo(125, 225);
			ctx.stroke();
			break;
		case 5:
			ctx.beginPath();
			ctx.moveTo(100, 115);
			ctx.lineTo(75, 135);
			ctx.stroke();
			break;
		case 6:
			ctx.beginPath();
			ctx.moveTo(100, 115);
			ctx.lineTo(125, 135);
			ctx.stroke();
			break;
		case 7:
			ctx.beginPath();
			ctx.arc(90, 40, 1, 0, Math.PI * 2, false);
			ctx.moveTo(110, 40);
			ctx.arc(110, 40, 1, 0, Math.PI * 2, false);
			ctx.moveTo(110, 60);
			ctx.arc(100, 60, 10, 0, Math.PI, true);
			ctx.stroke();
			for (let i = 0; i < currentWord.length; i++) {
				document.getElementById(currentWord+i).classList.remove('secret');
			}
			document.getElementById('lose').classList.remove('hidden');
			break;
	};
}

function newGame(){
	currentWord = dictionary[Math.floor(Math.random()*(dictionary.length-1))];
	currentWordArray = [];
	document.getElementById('lose').classList.add('hidden');
	document.getElementById('win').classList.add('hidden');
	document.getElementById('letterDisplay').innerHTML = '';
	let htmlToInsert = '';
	for (let i = 0; i < currentWord.length; i++) {
		htmlToInsert += '<div class="underline"><span class="letter secret" id="'+currentWord+i+'">'+currentWord[i]+'</span></div>';
		currentWordArray.push(currentWord[i]);
	}
	document.getElementById('letterDisplay').innerHTML = htmlToInsert;
	numWrong = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//create game stage
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#B2B5B3';
	ctx.beginPath();
	ctx.moveTo(175, 250);
	ctx.lineTo(25, 250);
	ctx.moveTo(35, 250);
	ctx.lineTo(35, 0);
	ctx.moveTo(35, 5);
	ctx.lineTo(100, 5);
	ctx.lineTo(100, 25);
	ctx.stroke();
	ctx.strokeStyle = 'Black';
}

function checkAnswer(answer){
	if (currentWordArray.indexOf(answer) != -1) {
		let indices = [];
		for (let i = 0; i < currentWord.length; i++) {
			if (currentWord[i] === answer) {
				indices.push(i);
			}
		}
		for (let i = 0; i < indices.length; i++) {
			document.getElementById(currentWord+indices[i]).classList.remove('secret');
		}
		checkSolution();
	} else {
		numWrong++;
		drawHangman(numWrong);
	}
}

function checkSolution() {
	if (document.getElementsByClassName('secret').length == 0) {
		document.getElementById('win').classList.remove('hidden');
	}
}
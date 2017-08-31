// GLOBAL VARIABLES
// ---------------------------------------------------------------------------
// Arrays and Variables for holding date
var wordsList = ["giraffe", "elephant", "leopard", "baboon", "rhinoceros", "wildebeest", "zebra"];
var currentWord = "";
var letters = [];
var numBlanks = 0;
var blanksAndSuccesses = []; // g - - - - - - 
var badLetters = [];
var letterInWord;

// Game counters
var winCount = 0;
var tries = 15;


//FUNCTIONS (Reusable blocks of code that I will call upon when needed)
// ---------------------------------------------------------------------------
function startGame() {
	currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
	letters = currentWord.split("");
	numBlanks = letters.length;

	// Reset
	tries = 15;
	badLetters = [];
	blanksAndSuccesses = [];

	// Populate blanksAndSuccess with right number of blanks.
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	// Change HTML to reflect round conditions
	// Using .join gets rid of the default commas that would have shown up between blanks if only innerHTML used.
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("guesses-remaining").innerHTML = tries;
	document.getElementById("wins").innerHTML = winCount;

	// Testing / Debugging
	console.log(currentWord);
	console.log(letters);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
	// Check if letter exists in code at all
	var letterInWord = false;

	for (var i = 0; i < numBlanks; i++) {
		if (currentWord[i] === letter) {
			letterInWord = true;
			// alert("letter found");
		}
	}
	// Check where in word letter exists, then populate out blanksAndSuccesses array.
	if (letterInWord) {

	for (var j = 0; j < numBlanks; j++) {
		if (currentWord[j] == letter) {
			blanksAndSuccesses[j] = letter;
		}
	}
	}

	// Letter wasn't found
	else {
		badLetters.push(letter);
		tries--;
	}

	// Testing & Debugging
	console.log(blanksAndSuccesses);
}

function roundComplete() {
	console.log("Win Count: " + winCount + " | Guesses left: " + tries);

	//Update the HTML to reflect the most recent stats
	document.getElementById("guesses-remaining").innerHTML = tries;
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrong-guesses").innerHTML = badLetters.join(" ");
	// Check if user won.
	if (letters.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You won!");
	
	// Update the win counter in the HTML
	document.getElementById("wins").innerHTML = winCount;

	startGame();	
	}		
	// If we've run out of guesses
	else if (tries === 0) {
		alert("You lose");

		startGame();
	}
}
// MAIN PROCESS
// ---------------------------------------------------------------------------

// Initiates the code the first time
startGame();

// Register keyclicks
document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
// Testing / Debugging
	console.log(letterGuessed);
}


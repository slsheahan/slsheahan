/**
 * 
 * Wordle Bot by Spencer Sheahan
 * 
 * This bot's primary function is to create a wordle on demand.
 * The wordle can be between 3 and 7 letters long, inclusive.
 * 
 * */
var lineReader = require('line-reader');

var Discord = require('discord.io');

var logger = require('winston');

var auth = require('./auth.json');
//const { error } = require('./node_modules/winston/index');

var hiddenWord = "dry";
var currGuesses = 0;
var wordSize = 0;
var numGuesses = 0;

// Configure logger settings

logger.remove(logger.transports.Console);

logger.add(new logger.transports.Console, {

colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot

var bot = new Discord.Client({

token: auth.token,

autorun: true

});

bot.on('ready', function (evt) {

logger.info('Connected');

logger.info('Logged in as: ');

logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {

// Our bot needs to know if it will execute a command

// It will listen for messages that will start with `!`

if (message.substring(0, 1) == '!') {

    var args = message.substring(1).split(' ');

    var cmd = args[0];
	var param = args[1];

    args = args.splice(1);

	switch (cmd) {

		// !ping

		case 'ping':

			bot.sendMessage({

				to: channelID,

				message: 'Pong!'

			});

			break;

		// Wordle
		case 'wordle':
			switch (param) {
				case '3':
					wordSize = 3;
					wordleInitializationHelper(wordSize);
					bot.sendMessage({
						to: channelID,
						message: "Wordle created"
					});
					break;
				case '4':
					wordSize = 4;
					wordleInitializationHelper(wordSize);
					bot.sendMessage({
						to: channelID,
						message: "Wordle created"
					});
					break;
				case '5':
					wordSize = 5;
					wordleInitializationHelper(wordSize);
					bot.sendMessage({
						to: channelID,
						message: "Wordle created"
					});
					break;
				case '6':
					wordSize = 6;
					wordleInitializationHelper(wordSize);
					bot.sendMessage({
						to: channelID,
						message: "Wordle created"
					});
					break;
				case '7':
					wordSize = 7;
					wordleInitializationHelper(wordSize);
					bot.sendMessage({
						to: channelID,
						message: "Wordle created"
					});
					break;
				
				default:
				bot.sendMessage({
					to: channelID,
					message: "Please enter a number 3-7"
				});
			}
			break;

		// Guesses
		case 'guess':
			wordleGuessHelper(channelID, param);
     }

 }
});

/**
 * Helper function for wordle command.  Supports words of size 3-7.  
 * Chooses a word to be guessed
 * 
 * @param wordleSize - size of desired wordle
 * 
 **/
function wordleInitializationHelper(wordleSize) {
	// Declare variables
	var wordIndex = Math.random() * 499;
	var currIndex = 0;
	numGuesses = wordleSize + 1;
	currGuesses = 0;

	// Prepare word database files
	var file3 = "\word_databases\\3letterwords.txt";
	var file4 = "\word_databases\\4letterwords.txt";
	var file5 = "\word_databases\\5letterwords.txt";
	var file6 = "\word_databases\\6letterwords.txt";
	var file7 = "\word_databases\\7letterwords.txt";

	// Different behavior for different wordle sizes
	switch (wordleSize) {
		case 3:
			lineReader.open(file3, function (error, reader) {
				if (error) throw error;

				// Iterate through database to find word
				while (currIndex <= wordIndex) {
					if (reader.hasNextLine()) {
						reader.nextLine(function (error, line) {
							try {
								if (error) throw error;
								hiddenWord = line.substring(0, wordleSize);
								currIndex++;
							} catch {
								reader.close(function (error) {
									if (error) throw error;
								});
							}
						});
					}
					else {
						reader.close(function (error) {
							if (error) throw error;
						});
					}
				}
			});

			break;

		case 4:
			lineReader.open(file4, function (error, reader) {
				if (error) throw error;

				// Iterate through database to find word
				while (currIndex <= wordIndex) {
					if (reader.hasNextLine()) {
						reader.nextLine(function (error, line) {
							try {
								if (error) throw error;
								hiddenWord = line.substring(0, wordleSize);
								currIndex++;
							} catch {
								reader.close(function (error) {
									if (error) throw error;
								});
							}
						});
					}
					else {
						reader.close(function (error) {
							if (error) throw error;
						});
					}
				}
			});
			break;
		case 5:
			lineReader.open(file5, function (error, reader) {
				if (error) throw error;

				// Iterate through database to find word
				while (currIndex <= wordIndex) {
					if (reader.hasNextLine()) {
						reader.nextLine(function (error, line) {
							try {
								if (error) throw error;
								hiddenWord = line.substring(0, wordleSize);
								currIndex++;
							} catch {
								reader.close(function (error) {
									if (error) throw error;
								});
							}
						});
					}
					else {
						reader.close(function (error) {
							if (error) throw error;
						});
					}
				}
			});
			break;
		case 6:
			lineReader.open(file6, function (error, reader) {
				if (error) throw error;

				// Iterate through database to find word
				while (currIndex <= wordIndex) {
					if (reader.hasNextLine()) {
						reader.nextLine(function (error, line) {
							try {
								if (error) throw error;
								hiddenWord = line.substring(0, wordleSize);
								currIndex++;
							} catch {
								reader.close(function (error) {
									if (error) throw error;
								});
							}
						});
					}
					else {
						reader.close(function (error) {
							if (error) throw error;
						});
					}
				}
			});
			break;
		case 7:
			lineReader.open(file7, function (error, reader) {
				if (error) throw error;

				// Iterate through database to find word
				while (currIndex <= wordIndex) {
					if (reader.hasNextLine()) {
						reader.nextLine(function (error, line) {
							try {
								if (error) throw error;
								hiddenWord = line.substring(0, wordleSize);
								currIndex++;
							} catch {
								reader.close(function (error) {
									if (error) throw error;
								});
							}
						});
					}
					else {
						reader.close(function (error) {
							if (error) throw error;
						});
					}
				}
			});
			break;
	}
}

/**
 * Gives feedback to the user for a guess. Prints 
 * 
 * @returns none
 */
function wordleGuessHelper(channelID, guess) {
	// Make sure wordle has been properly initialized
	if (hiddenWord == null) {
		bot.sendMessage({
			to: channelID,
			message: 'Initialize wordle before guessing'
		});
		return;
    }

	// Guess variables
	let wordComp = [];

	// Check if valid guess
	if ((guess == null) || (guess.length != wordSize)) {
		bot.sendMessage({
			to: channelID,
			message: 'Invalid guess length.'
		});

		return;
	}

	// Increment guesses number
	currGuesses++;

	// Decipher word
	var letterInWord = false;
	var wordIsCorrect = true;

	for (let j = 0; j < wordSize; j++) {
		// Letter in right spot case
		if (hiddenWord.charAt(j) == guess.charAt(j)) {
			wordComp.push(guess.charAt(j));
		}
		else {
			wordIsCorrect = false;
			for (let k = 0; k < wordSize; k++) {
				if (hiddenWord.charAt(k) == guess.charAt(j)) {
					letterInWord = true;
					break;
				}
			}

			// Letter not in word case
			if (!letterInWord) {
				wordComp.push('0');

			} else {
			// Letter in word case
				wordComp.push('1');
				letterInWord = false;
			}
		}
	}

	// Determine result
	var outputString = "";

	for (let j = 0; j < wordComp.length; j++) {
		outputString += wordComp[j];
	}

	if (wordIsCorrect) {
		outputString = 'You win!';
		bot.sendMessage({
			to: channelID,
			message: outputString
		});
		hiddenWord = null;

	} else if (currGuesses >= numGuesses) {
		outputString = 'You lose!  The word was ' + hiddenWord;
		bot.sendMessage({
			to: channelID,
			message: outputString
		});
		hiddenWord = null;
	} else {
		bot.sendMessage({
			to: channelID,
			message: outputString
		});
    }
}
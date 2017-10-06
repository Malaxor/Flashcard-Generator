
var inquirer = require("inquirer");
var fs = require("fs");

// cloze cards connstructor
function clozeCard(full, cloze, partial) {

	this.full = full;
	this.cloze = cloze;
	this.partial = partial;
}

var clozeArray = [];

// this function will push cloze flash cards into the clozeArray
function pushCloze() {

	fs.readFile("cloze.txt", "utf8", function(error, response) {
		// if we don't get an error
		if(!error) {
			// store the parsed response (readability) into a variable
			var data = JSON.parse(response);
			// run a for-loop through all the data
			for(var i = 0; i < data.length; i++) {
				// push the data into the cloze array
				clozeArray.push(data[i]);
			}
		}
	});
	pushCloze();
}
// use this function to create cloze flash cards
function createCloze() {

	inquirer.prompt([
		{
			name: "full",
			message: "Type in a trivia fact, then press enter."
		},{
			name: "cloze",
			message: "What part do you want removed?"
		}
	]).then(function(answers) {
		// create a new cloze card
		var newClozeCards = new clozeCards(answers.full, answers.cloze);
		// push the new cloze card into the cloze array
		clozeArray.push(newClozeCards);
		// ask if the user would like to create another cloze card
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "Would you like to generate another cloze card?"
			}
		]).then(function(generate) {
			//if the user chooses to create another card...
			if(generate.confirm === true) {
				createCloze();
			}
			else {
				console.log("++++++++++++++++++++++++\n" + "Some other time, perhaps.");
				// if we've finished creating cloze cards, copy the cloze array values onto the cloze.txt file
				fs.writeFile("cloze.txt", JSON.stringify(clozeArray, null, 2), function(error) {
				// if no error...
                    if(!error) {
                        console.log("++++++++++++++++++++++++\n" + "Added new content!" + "\n++++++++++++++++++++++++");
                }   }   
			}

		});

	});

}
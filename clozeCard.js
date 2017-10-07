
var inquirer = require("inquirer");
var fs = require("fs");

// cloze cards connstructor
function clozeCard(full, cloze, partial) {

	this.full = full;
	this.cloze = cloze;
	this.partial = full.replace(cloze, "...");
};

var clozeArray = [];

// this function will push cloze flash cards into the clozeArray
function generateCloze() {
	// if we don't push the initial response into an array, the original data will be overriden later
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
			inquirer.prompt([
				{
					name: "full",
					message: "Type in a trivia fact, then press enter -->"
				},{
					name: "cloze",
					message: "Which part do you want removed?"
				}
			]).then(function(answers) {
				// create a new cloze card
				var newClozeCard = new clozeCard(answers.full, answers.cloze);
				// push the new cloze card into the cloze array
				clozeArray.push(newClozeCard);
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
						generateCloze();
					}
					else {
						console.log("++++++++++++++++++++++++\n" + "Some other time, perhaps.");
						// if we've finished creating cloze cards, copy the cloze array values onto the cloze.txt file
						fs.writeFile("cloze.txt", JSON.stringify(clozeArray, null, 2), function(error) {
						// if no error...
		                    if(!error) {

							  console.log("++++++++++++++++++++++++\n" + "Added new content!" + "\n++++++++++++++++++++++++");
		                    }
		                });
					}
				});
			});
		}
	});	
}	
// call this function to read the cloze cards
function readCloze() {
	
	fs.readFile("cloze.txt", "utf8", function(error, response) {
		// if we don't get an error
		if(!error) {
			// store the parsed response (json object = better readability) into a new varbiable
			var data = JSON.parse(response);
			// store the response's length into a new variable
			var length = data.length;
			// randomly choose an index from the object(response)
			var random = Math.floor(Math.random() * length);
			// utilize inquirer prompt to retrieve cloze cards
			inquirer.prompt([
				{
					name: "text",
					message: data[random].partial 
				},{
					name: "confirm",
					type: "confirm",
					message: "Type 'yes/y' to check your answer"
				}
			]).then(function(answer) {
				// if the user confirms 
				if(answer.confirm === true) {
					//display the full text 
					console.log(data[random].full);
					// ask the user if he/she would like another cloze card
					inquirer.prompt([
						{
							name: "confirm",
							type: "confirm",
							message: "Would you like another cloze card?"
						}
					]).then(function(more) {
						// if the user confirm's..
						if(more.confirm === true) {
							// run the readCloze function again
							readCloze();
						}
						else {
							console.log("\nYour brain's gonna explode. Let's take a break!");
						}
					});
				}
				else {

					console.log("\nOne must occasionally pause in order to continue")
				}		
			});
		}
	});
}

module.exports = {

	clozeCard,
	generateCloze,
	readCloze
};
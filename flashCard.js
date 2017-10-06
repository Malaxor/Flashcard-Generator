// required node modules
var fs = require("fs");
var inquirer = require("inquirer");
// exported files stored into variables
var basicCard = ("./basicCard.js");
var clozeCard = ("./clozeCard");
// store the choices (basic, cloze) into an array
var types = ["basic", "cloze"];
// this inquirer will be utilized at startup
inquirer.prompt([
	{
		name: "options",
		type: "list",
		message: "Please select a choice from the list",
		choices: ["generate flashcards", "study"]
	}
]).then(function(response) {
	// if the user selects generate a flashcard...
	if(response.options === "generate flashcards") {
		// utilize inquirer to display the type of flash card the user wants to create
		inquirer.prompt([
			{
				name: "cards",
				type: "list",
				message: "What type of flashcard would you like to create?",
				choices: types
			}
		]).then(function(create) {
			// if the user selects basic flashcard
			if(create.cards === "basic") {
				// display the message bellow in command
				console.log("You've chosen to create basic flashcards");
				// run the follwing two functions:
				basicCard.pushBasic();
			}
			else if (create.cards === "cloze") {
				// display the message bellow in command
				console.log("You've chosen to create cloze flashcards");
				// run the follwing two functions:
				clozeCard.pushCloze();
			}
		});
	} 
	else if (response.options === "study") {
		// utilize inquirer to select study using cloze flashcards or basic flaschards
		inquirer.prompt([
			{
				name: "cards",
				type: "list",
				message: "With what type of flash card would you like to study?",
				choices: types
			}
		]).then(function(studyWith) {
			// if the user selects to study with a basic card...
			if(studyWith.cards === "basic") {
				// notify the user of his/her choice
				console.log("You want to study with basic flashcards.");
				// run the readBasic function to study using basic flashcards
				basicCard.readBasic();
			}
			else if (studyWith.cards === "cloze") {
				// notify the user of his/her choice
				console.log("You want to study with cloze flashcards.");
				// run the readCloze function to study using cloze flashcards
				clozeCard.readCloze();
			}
		});
	}
});
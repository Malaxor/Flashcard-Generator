
const inquirer = require("inquirer");

const basicCard = require("./basicCard.js");
const clozeCard = require("./clozeCard.js");
const deleteCard = require("./deleteCard.js");

const types = ["basic", "cloze"];

(function app() {

	inquirer.prompt([
		{
			name: "options",
			type: "list",
			message: "\nPlease select a choice from the list",
			choices: ["generate flashcards", "study", "delete flashcards"]
		}
	]).then(response => {
		
		switch(response.options) {
	
			case 'generate flashcards':
			generateFlashcards();
			break;
	
			case 'study':
			study();
			break;
	
			case 'delete flashcards':
			deleteFlashcards();
			break;
		}
	});
}());


function generateFlashcards() {

	inquirer.prompt([
		{
			name: "cards",
			type: "list",
			message: "What type of flashcard would you like to create?",
			choices: types
		}
	]).then(create => {
		
		if(create.cards === "basic") {
			
			console.log("\nYou've chosen to create basic flashcards\n");
			basicCard.generateBasic();
		}
		else if (create.cards === "cloze") {
			
			console.log("\nYou've chosen to create cloze flashcards\n");
			clozeCard.generateCloze();
		}
	});
}

function study() {

	inquirer.prompt([
		{
			name: "cards",
			type: "list",
			message: "With what type of flash card would you like to study?",
			choices: types
		}
	]).then(study => {
		
		if(study.cards === "basic") {
			
			console.log("\nYou want to study with basic flashcards.\n");
			
			basicCard.readBasic();
		}
		else if (study.cards === "cloze") {
			
			console.log("\nYou want to study with cloze flashcards.\n");
			
			clozeCard.readCloze();
		}
	});
}

function deleteFlashcards() {

	inquirer.prompt([
		{
			name: "cards",
			type: "list",
			message: "Which type of flashcards would you like to delete?",
			choices: types
		}
	]).then(destroy => {

		if(destroy.cards === "basic") {

			console.log("\nYou've chosen to delete basic flashcards.\n");
			deleteCard.deleteBasic();
		}
		else if(destroy.cards === "cloze") {

			console.log("\nYou've chosen to delete cloze flashcards.\n");
			deleteCard.deleteCloze();
		}
	});
}
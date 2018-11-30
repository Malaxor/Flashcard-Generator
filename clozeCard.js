
const inquirer = require("inquirer");
const fs = require("fs");

class ClozeCard {

	constructor(full, cloze, partial) {

		this.full = full;
		this.cloze = cloze;
		this.partial = full.replace(cloze, "...");
	}	
};

function generateCloze() {

	const clozeArray = [];
	// if we don't push the initial response into an array, the original data will be overriden later
	fs.readFile("cloze.txt", "utf8", (error, response) => {

		if(!error) {
			
			response = JSON.parse(response);
			response.forEach(item => clozeArray.push(item));

			inquirer.prompt([
				{
					name: "full",
					message: "Type in a trivia fact, then press enter."
				},{
					name: "cloze",
					message: "Which part do you want removed?"
				}
			]).then(card => {
	
				const newClozeCard = new ClozeCard(card.full, card.cloze);
				clozeArray.push(newClozeCard);

				inquirer.prompt([
					{
						name: "confirm",
						type: "confirm",
						message: "Would you like to generate another cloze card?"
					}
				]).then(generate => {
					
					if(generate.confirm) {
						generateCloze();
					}
					else {
						console.log(`+++++++++++++++++++++++++\n Perhaps some other time.`);

						fs.writeFile("cloze.txt", JSON.stringify(clozeArray, null, 2), error => {

		                    if(!error) {
								console.log(`+++++++++++++++++++++++++\n Added new content! \n++++++++++++++++++++++++`);
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
	
	fs.readFile("cloze.txt", "utf8", (error, response) => {
	
		if(!error) {
			
			response = JSON.parse(response);
			const random = Math.floor(Math.random() * response.length);
		
			inquirer.prompt([
				{
					name: "text",
					message: response[random].partial 
				},{
					name: "confirm",
					type: "confirm",
					message: "Type 'y' to check your answer."
				}
			]).then(answer => {
			
				if(answer.confirm) {
					
					console.log(response[random].full);
					// ask the user if he/she would like another cloze card
					inquirer.prompt([
						{
							name: "confirm",
							type: "confirm",
							message: "Would you like another cloze card?"
						}
					]).then(card => {
					
						if(card.confirm) {
						
							readCloze();
						}
						else {
							console.log("\nYour brain's gonna explode. Let's take a break!");
						}
					});
				}
				else {

					console.log("\nOne must occasionally pause in order to continue.")
				}		
			});
		}
	});
}

module.exports = {

	ClozeCard,
	generateCloze,
	readCloze
};
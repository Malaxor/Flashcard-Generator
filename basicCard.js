
const inquirer = require("inquirer");
const fs = require("fs");

class BasicCard {

	constructor(front, back) {

		this.front = front;
		this.back = back;
	}
}

function generateBasic() {

	const basic = [];
	
   fs.readFile("basic.txt", "utf8", (error, response) => {
        
      if(!error) {

      	response = JSON.parse(response);
         response.forEach(datum => basic.push(datum));

    	   inquirer.prompt([
				{
					name: "front",
					message: "Please type a trivia question ---> "
				},{
					name: "back",
					message: "What is the answer to the question?"
				}
         ]).then(card => {

				const newBasicCard = new BasicCard(card.front, card.back);
				basic.push(newBasicCard);
	
				inquirer.prompt([
					{
						name: "confirm",
						type: "confirm",
						message: "Would you like to generate another flash card?"   
					}
            ]).then(generate => {

					if(generate.confirm) {
						generateBasic();
					}
					else {
						console.log(`+++++++++++++++++++++++++\n I needed a break anyway`);
						fs.writeFile("basic.txt", JSON.stringify(basic, null, 2), error => {

							if(!error) {
								console.log(`+++++++++++++++++++++++++\n Added new content! \n++++++++++++++++++++++++`);
							}                
						});
               }
            });  
         });
		}
		else {
			console.log(error);
		}
   });
}    

function readBasic() {

   fs.readFile("basic.txt", "utf8", (error, response) => {

      if(!error) {

			response = JSON.parse(response);
			const random = Math.floor(Math.random() * response.length);

			inquirer.prompt([
				{
					name: "front",
					message: response[random].front
				},{
					name: "confirm",
					type: "confirm",
					message: "Type 'y' to know the answer!"
				}
			]).then(answer => {

				if(answer.confirm) {

					console.log(`---------------------------------------\n Answer: ${response[random].back}"\n---------------------------------------`);
						// then ask if the user would like another flash card
						inquirer.prompt([
						{
							name: "confirm",
							type: "confirm",
							message: "Ya wanna keep stuyding?"
						}
					]).then(study => {

						if(study.confirm) {
							// run the readBasic function to display another flashcard
							readBasic();
						}
						else {
							console.log("\nYou've leared several new facts today. Come back soon!")
						}
					});
				} 
				else {
					console.log("\nYou've selected 'no'; the session has ended.")
				}
         });         
      }
   });
}
module.exports = {

	BasicCard,
	generateBasic,
	readBasic
};
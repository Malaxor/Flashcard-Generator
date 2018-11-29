// required node modules
var inquirer = require("inquirer");
var fs = require("fs");

var choices = ["basic", "cloze"];

var cardArray = [];

// run this function to begin the deletion process
function deleteBasic() {

	fs.readFile("basic.txt", "utf8", function(err, res) {
		// if we don't get an error
		if(!err) {
			// store the parsed response into a new variable
			var data = JSON.parse(res);
			// run a for-loop through the data
			for(var i = 0; i < data.length; i++) {
				// push the data into the empty cardArray
				cardArray.push(data[i].front);
			}	
			inquirer.prompt([
				{
					name: "card",
					type: "list",
					message: "================================================\nWhich basic card would you like to delete?\n==================================================",
					choices: cardArray 
				}
			]).then(function(answer) {

				var number = 0;

				for(var i = 0; i < cardArray.length; i++) {
					// when the the user's choice matches the object found in the array
					if(answer.card === cardArray[i].front) {
						// variable number now equals the matching card's index number
						number = i;
					}
				}
				// use the splice method to delete the card
				data.splice(number,1);
				// utilize the writeFile method to re-write cloze.txt's content without the deleted card
				fs.writeFile("basic.txt", JSON.stringify(data, null, 2), function(err, res) {
					// if we don't receive an error...
					if(!err) {
						// display the following
						console.log("\nContent removed.\n")
					}
				});
			});	
		}	
	});
}
// this function is identical to the one above
function deleteCloze() {

	fs.readFile("cloze.txt", "utf8", function(err, res) {

		if(!err) {

			var data = JSON.parse(res);

			for(var i = 0; i < data.length; i++) {

				cardArray.push(data[i].full)
			}
			inquirer.prompt([
				{
					name:"card",
					type: "list",
					message: "================================================\nWhich cloze card would you like to delete?\n==================================================",
					choices: cardArray
				}
			]).then(function(answer) {

				var number = 0;

				for(var i = 0; i < cardArray.length; i++) {

					if(answer.card === cardArray[i].full) {

						number = i;
					}
				}
				data.splice(number,1);

				fs.writeFile("cloze.txt", JSON.stringify(data, null, 2), function(err, res) {

					if(!err) {
						console.log("\nContent removed.\n");
					}
				});
			});
		}
	});
}

module.exports = {

	deleteBasic,
	deleteCloze
};
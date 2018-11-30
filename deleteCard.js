
const inquirer = require("inquirer");
const fs = require("fs");

function deleteBasic() {

	const basicArr = [];

	fs.readFile("basic.txt", "utf8", (err, res) => {
		
		if(!err) {
			
			res = JSON.parse(res);
			res.forEach(item => basicArr.push(item.front));

			inquirer.prompt([
				{
					name: "cards",
					type: "list",
					message: "================================================\nWhich basic card would you like to delete?\n==================================================",
					choices: basicArr 
				}
			]).then(card => {

				let number = 0;
				
				basicArr.forEach((item, index) => {

					if(card.cards === item) {

						number = index;
					} 	
				});
				res.splice(number, 1);

				fs.writeFile("basic.txt", JSON.stringify(res, null, 2), (err, response) => {
					
					if(!err) {
						console.log("\nContent removed.\n")
					}
				});
			});	
		}	
	});
}

function deleteCloze() {

	const clozeArr = [];

	fs.readFile("cloze.txt", "utf8", (err, res) => {

		if(!err) {

			res = JSON.parse(res);
			res.forEach(item => clozeArr.push(item.full));

			inquirer.prompt([
				{
					name:"cards",
					type: "list",
					message: "================================================\nWhich cloze card would you like to delete?\n==================================================",
					choices: clozeArr
				}
			]).then(card => {

				let number = 0;
				
				clozeArr.forEach((item, index) => {

					if(card.cards === item) {

						number = index;
					} 	
				});
				res.splice(number, 1);

				fs.writeFile("cloze.txt", JSON.stringify(res, null, 2), (err, response) => {

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
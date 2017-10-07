// store the necessary node modules into variables
var inquirer = require("inquirer");
var fs = require("fs");

// basic card constructor with two arguments
function basicCard(front, back) {

	this.front = front;
	this.back = back;
};

// new basic flashcards will be stored into an empty array
var basic = [];

// function used to create flashcards
function generateBasic() {
    // if we don't push the initial response into an array, the original data will be overriden later
    fs.readFile("basic.txt", "utf8", function(error, response) {
        // if we don't receive an error...
        if (!error) {
    	    // store the parsed response into a new variable 
            var data = JSON.parse(response);
    	    // loop through all the data
    	    for(var i = 0; i < data.length; i++) {
    	        // place all the data into the basic array
    	        basic.push(data[i]);
            } 
    	   inquirer.prompt([
                {
                    name: "front",
                    message: "Please type a trivia question ---> "
                },{
                    name: "back",
                    message: "What is the answer to the question?"
                },
            ]).then(function(answers) {
                // use the answers to create a new basic card
                var newBasicCard = new basicCard(answers.front, answers.back);
                // push the new flash card into the basic array
                basic.push(newBasicCard);
                // ask if the user would like to create another flash card
                inquirer.prompt([
                    {
                        name: "confirm",
                        type: "confirm",
                        message: "Would you like to generate another flash card?"   
                    }
                ]).then(function(generate) {
                    // if the answer is yes (true)
                    if(generate.confirm === true) {
                        // run the createBasic function again to generate another flash card
                        generateBasic();
                    }
                    else {
                        console.log("++++++++++++++++++++++++\n" + "I needed a break anyway.");
                        // if we're done creating cards, copy the basic array's content in the basic.txt file
                        fs.writeFile("basic.txt", JSON.stringify(basic, null, 2), function(error) {
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
// call this function to read the flashcards 
function readBasic() {

    fs.readFile("basic.txt", "utf8", function(error, response) {
        // if we don't get an error...
        if(!error) {
            // parse the data so it's readable
            var data = JSON.parse(response);
            // store the responses's length into a variable
            var length = data.length;
            // this variable will be used to randomly pick a flash cards everytime a new game starts
            var random = Math.floor(Math.random() * length);
            //unse inquirer to display a random flashcard
            inquirer.prompt([
                {
                    name: "front",
                    message: data[random].front
                },{
                    name: "confirm",
                    type: "confirm",
                    message: "Type 'yes/y' to know the answer!"
                }
            ]).then(function(answers) {
                // if the user selects yes...
                if(answers.confirm === true) {
                    // display the answer found on the flashcard's back
                    console.log("---------------------------------------\n" + "Answer: " + data[random].back + 
                                "\n---------------------------------------");
                    // then ask if the user would like another flash card
                    inquirer.prompt([
                        {
                            name: "confirm",
                            type: "confirm",
                            message: "Ya wanna keep stuyding?"
                        }
                    ]).then(function(more) {
                        // if you confirm the question (yes or enter)
                        if(more.confirm === true) {
                            // run the readBasic function to display another flashcard
                            readBasic();
                        }
                        else {
                            console.log("\nYou've leared a several new facts today. Come back soon!")
                        }
                    });
                } // if we don't want to know the answer
                else {
                    console.log("You've selected 'no'; the session has ended.")
                }
            });         
        }
    });
}


module.exports = {

    basicCard,
    generateBasic,
    readBasic
};


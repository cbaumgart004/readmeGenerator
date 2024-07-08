// TODO: Include packages needed for this application
    const inquirer = require('inquirer');
    const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = () => { 
inquirer
.prompt([
    {
        type: 'input',
        name: 'username',
        message: 'Enter your GitHub username'
    }
]).then (answers => {
    const newReadMe = generateMarkdown(answers);
    writeToFile('newREADME.md', newReadMe);
    //console.log(`Welcome ${answers.username}`)
});
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('New README created successfully');
    });
};

// TODO: Create a function to initialize app
function init() {
    questions ();
}

// Function call to initialize app
init();

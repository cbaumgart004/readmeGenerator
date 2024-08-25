// TODO: Include packages needed for this application
    const inquirer = require('inquirer');
    const fs = require('fs');
    const generateMarkdown = require('./utils/generateMarkdown');
    //Add a list of licenses to choose from inquirer
    const licenseOptions = [
        {
            name: 'MIT License',
            value: 'MIT',
            badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
        },
        {
            name: 'Apache License 2.0',
            value: 'Apache-2.0',
            badge: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
        },
        {
            name: 'GPL-3.0',
            value: 'GPL-3.0',
            badge: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)'
        },
        {
          name: 'BSD-3-Clause',
            value: 'BSD-3-Clause',
            badge: '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
        }
        // Add more license options with corresponding badges as needed
      ];

    // TODO: Create an array of questions for user input
    const questions = () => {
        const collaborators = [];
    
        const promptCollaborators = () => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the collaborator\'s name:'
                },
                {
                    type: 'input',
                    name: 'username',
                    message: 'Enter the collaborator\'s GitHub username:'
                }
            ]).then(collaboratorAnswers => {
                collaborators.push(collaboratorAnswers);
                return inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'addMoreCollaborators',
                        message: 'Do you want to add more collaborators to your project?',
                        default: false
                    }
                ]).then(({ addMoreCollaborators }) => {
                    if (addMoreCollaborators) {
                        return promptCollaborators(); // Recursive call to add more collaborators
                    } else {
                        return collaborators;
                    }
                });
            });
        };
    
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of your project'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter the description of your project'
            },
            {
                type: 'input',
                name: 'installation',
                message: 'What are the steps to install your project?'
            },
            {
                type: 'input',
                name: 'usage',
                message: 'Provide instructions and examples for use. Include screenshots as needed.'
            },
            {
                type: 'input',
                name: 'Credits',
                message: 'Include Credits for your project'
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Enter your Author name'
            },
            {
                type: 'input',
                name: 'username',
                message: 'Enter your GitHub username'
            },
            {
                type: 'confirm',
                name: 'addCollaborators',
                message: 'Do you want to add any collaborators to your project?',
                default: false
            },
            {
                type: 'list',
                name: 'license',
                message: 'Choose a license for your application:',
                choices: licenseOptions
            },
            {
                type: 'input',
                name: 'licenseUrl',
                message: 'Enter the URL of your license'
            }
        ]).then(answers => {
            if (answers.addCollaborators) {
                return promptCollaborators().then(newCollaborators => {
                    const newReadMe = generateMarkdown({ ...answers, collaborators: newCollaborators });
                    writeToFile('newREADME.md', newReadMe);
                    console.log('New README file generated successfully!');
                });
            } else {
                const newReadMe = generateMarkdown({ ...answers, collaborators });
                writeToFile('newREADME.md', newReadMe);
                console.log('New README file generated successfully!');
            }
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

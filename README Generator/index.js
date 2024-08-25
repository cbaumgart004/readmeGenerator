// Include packages needed for this application
    const inquirer = require('inquirer');
    const fs = require('fs');
    const generateMarkdown = require('./utils/generateMarkdown');
    //Add a list of licenses to choose from inquirer
    
    const licenseOptions = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause'];

    //  Create an array of questions for user input
    const questions = () => {
        const collaborators = [];
    //Create an array for collaborators
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
        //Project prompts here
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
                name: 'credits',
                message: 'Include Credits for your project (contributors are added at the end)'
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
                type: 'input',
                name: 'addResourceName',
                message: 'Please enter the names of any third-party resources your project uses (e.g., APIs, libraries, etc)',
                
            },
                {
                type: 'input',
                name: 'addResources',
                message: 'Please enter the URLs of any third-party resources your project uses (e.g., APIs, libraries)'
                },
            {
                type: 'list',
                name: 'license',
                message: 'Choose a license for your application:',
                choices: licenseOptions
            },
            {
                type: 'input',
                name: 'licenseLink',
                message: 'Enter the URL of your license'
            }
            //if there are any collaborators, return them here
        ]).then(answers => {
            if (answers.addCollaborators) {
                return promptCollaborators().then(newCollaborators => {
                    // Update the answers with the new collaborators and project responses
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

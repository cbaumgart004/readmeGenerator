// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}



// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(licenseLink) {}
  
// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  renderLicenseBadge(data.license);
  renderLicenseLink(data.licenseLink);
  renderLicenseSection(data.license);
  return `# ${data.title}
  ## Description
  ${data.description}

  ## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

##Installation
  ${data.installation}

## Usage
${data.usage}

## Credits
Authored by [Chris Baumgart](https://github.com/${data.username})
Contributors:
${data.collaborators.map(collaborators => `- [${collaborators.name}](https://github.com/${collaborators.username})`).join('\n')}
Third Party Resources:
  

  ## License
  ${renderLicenseBadge(data.license)}
`;

}

module.exports = generateMarkdown;

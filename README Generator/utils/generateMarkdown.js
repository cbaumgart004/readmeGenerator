// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
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
const selectedLicense = licenseOptions.find(option => option.value === license);
  if (selectedLicense) {
    return selectedLicense.badge;
  } else {
    return '';
  };
};
// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(licenseLink) {
  if (licenseLink) {
    return `[License](${licenseLink})`;
  } else {
    return '';
  };
}
  
// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license, licenseLink) {
  
  if (license) {
   return`## License\n${renderLicenseBadge(license)} ${renderLicenseLink(licenseLink)} `; 
  
} else{
  return '';  // If no license provided, return an empty string for license section  }
}
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  const licenseLink = renderLicenseLink(data.licenseLink);
  const licenseSection = renderLicenseSection(data.license, data.licenseLink);
  return `
  # ${data.title}
  ## Description
  ${data.description}

  ## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
  ${data.installation}

## Usage
${data.usage}

## Credits
Authored by [${data.authorName}](https://github.com/${data.username})
Contributors:
${data.collaborators.map(collaborators => `- [${collaborators.name}](https://github.com/${collaborators.username})`).join('\n')}

Third Party Resources:
  

${licenseSection}
`;

}

module.exports = generateMarkdown;

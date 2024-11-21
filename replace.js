const fs = require('fs');
const path = require('path');

// Specify the directory containing the generated file
const directoryPath = path.resolve(__dirname, 'dist/assets');

// Function to find the target file
function findFile(directory, fileExtension) {
  const files = fs.readdirSync(directory);
  const targetFile = files.find(file => file.endsWith(fileExtension));
  return targetFile ? path.join(directory, targetFile) : null;
}

// Specify the file's extension if you know it
const targetFilePath = findFile(directoryPath, '.js');

if (targetFilePath) {
  fs.readFile(targetFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Replace the target line or code with your desired change
    const modifiedData = data.replace(/originalCodeLine/g, 'newCodeLine');

    fs.writeFile(targetFilePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File has been modified successfully.');
      }
    });
  });
} else {
  console.error('Target JS file not found.');
}

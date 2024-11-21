import fs from 'fs';
import path from 'path';
import { glob } from 'glob'; 

// Use import.meta.url to get the current directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log(`dirname: ${__dirname}`);

// Glob pattern to match all .js files in the dist directory
const pattern = path.join(__dirname, 'dist/assets', '**', '*.js');
console.log(`pattern: ${pattern}`);

// Function to process files using Promises for asynchronous handling
glob(pattern, (err, files) => {
  if (err) {
    console.error(`Error finding files: ${err}`);
    return;
  }

  files.forEach((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}: ${err}`);
        return;
      }

      // Replace the target string with the desired string
      const result = data.replace(/TOSKU_/g, 'wp-content/themes/tosku/dist/TOSKU_');

      fs.writeFile(file, result, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${file}: ${err}`);
          return;
        }

        console.log(`Processed file: ${file}`);
      });
    });
  });
});
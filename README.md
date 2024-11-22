# Tosku theme for Wordpress 

A react app wrapped in a Wordpress theme.

## Structure

Main entry
`src/App.jsx` imports all other files and assets.

## Assets

All assets are model exports from the main TOSKU blender file not in this repo. 

## React App

to run a development enviornment 
`npm install`
`npm run dev`

## Navigating the Scene

The site is a three.js app, to orbit and around the scene to diffrent rooms of the building
uncomment Ln: 84 and comment out Ln:82 in `src/App.jsx`

## Worpress theme updates

`npm run build`

- find and replace the base url of all assets in /dist/asstets/*.js from "/TOSKU_" to "/wp-content/themes/tosku/dist/TOSKU_"

- update the functions.php file, tosku_enqueue_scripts() function with the newly generated built .js and .css file names.



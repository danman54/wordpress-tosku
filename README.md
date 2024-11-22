# Tosku theme for Wordpress 

A react app wrapped in a Wordpress theme.

## Structure

Main entry
`src/App.jsx` imports all other files and assets.

## Assets

All assets are exports from the main TOSKU blender file not in this repo. 

## React App

to run a development enviornment 
`npm install`
`npm run dev`

## Navigating the Scene

The site is a three.js app, to move around the scene to diffrent rooms of the building
uncomment <OrbitControls /> and comment out <CameraControl/> in `src/App.jsx`

## Worpress theme updates

`npm run build`

- find and replace the base url of all assets in /dist/asstets/*.js from "/TOSKU_" to "/wp-content/themes/tosku/dist/TOSKU_"

- update the functions.php file tosku_enqueue_scripts() function with new generated built .js and .css files



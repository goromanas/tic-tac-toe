Tic-tac-toe game built using Node.js and React.

## Run game

In order to start the game, run 2 commands below:

### `yarn dev`
### `yarn start`

Runs the BE and FE of the game.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Game is built using:
* Node.js
* React
* Express
* MongoDB

## Features:

* Two users play a game of tick-tack-toe on the same computer 
* No real-time functionality is required 
* Single session 
* All actions are reported to the API, which saves them - reported to /action API and saved in MongoDB
* Action log is displayed underneath the game area, read from the API 
* The game resumes completely if the browser is refreshed
